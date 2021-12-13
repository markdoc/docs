const Markdoc = require('@stripe-internal/markdoc');

// TODO consider parsing the frontmatter as YAML for Markdoc version,
// and using specific values for various configs (e.g. <head> values)

async function gatherPartials(ast) {
  let partials = {};

  for (const node of ast.walk()) {
    const file = node.attributes.file;

    if (
      node.type === 'tag:partial' &&
      typeof file === 'string' &&
      !partials[file]
    ) {
      const content = await new Promise((res, rej) => {
        this.resolve(this.context, file, (error, filepath) => {
          if (error) {
            rej(error);
          } else {
            // parsing is not done here because then we have to serialize and reload from JSON at runtime
            res(this.fs.readFileSync(filepath, 'utf8'));
          }
        });
      });

      const ast = Markdoc.parse(content);

      partials = {
        ...partials,
        [file]: content,
        ...(await gatherPartials.call(this, ast)),
      };
    }
  }

  return partials;
}

// Returning a JSX object is what allows fast refresh to work
module.exports = async function loader(source) {
  const {
    schemaPath,
    mode = 'static',
    config = () => {},
  } = this.getOptions() || {};

  const ast = Markdoc.parse(source);
  const buildConfig = await config(ast);

  const errors = Markdoc.validate(ast)
    .filter((e) => e.error.level === 'critical')
    // TODO is this reason enough to create the schema at build time?
    // tags are not yet registered, so ignore these errors
    .filter((e) => e.error.id !== 'tag-undefined')
    .flatMap((e) => {
      const lines = source.split('\n');

      const message = [e.error.message, ...lines.slice(...e.lines)];

      if (
        e.error &&
        e.error.location &&
        e.error.location.start &&
        e.error.location.start.offset
      ) {
        const prev = lines.slice(0, e.lines[0]).join('\n').length;
        const diff = e.error.location.start.offset - prev;

        const pointer = `${' '.repeat(diff)}^`;
        message.push(pointer);
      }

      // add extra newline between errors
      message.push('');
      return message;
    });

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }

  const partials = await gatherPartials.call(this, ast);

  const importPath = require.resolve(schemaPath);
  const runtimePath = require.resolve('./runtime');

  // TODO consider making this an option per-page
  const dataFetchingFunction =
    mode === 'server' ? 'getServerSideProps' : 'getStaticProps';

  return `
  import React from 'react';
  import Markdoc from '@stripe-internal/markdoc';

  import {transformSchema, transformComponents} from '${runtimePath}'
  import * as schema from '${importPath}';

  const components = transformComponents(schema)

  export async function ${dataFetchingFunction}(context) {
    const ast = Markdoc.parse(${JSON.stringify(source)});
    const partials = ${JSON.stringify(partials)}

    Object.keys(partials).forEach((key) => {
      partials[key] = Markdoc.parse(partials[key]);
    });

    const buildConfig = ${JSON.stringify(buildConfig)};

    const config = {
      ...buildConfig,
      ...transformSchema(schema),
      partials,
    }

    // Convert the AST into a rendered tree
    const processed = Markdoc.process(ast, config);
    const content = Markdoc.expand(processed, config);

    return {
      // Remove undefined
      props: JSON.parse(JSON.stringify({
        isMarkdoc: true,
        content,
        frontmatter: ast.attributes.frontmatter,
      }))
    }
  }

  export default function MarkdocComponent(props) {
    const render = Markdoc.renderers.react(props.content, React);
    return render({
      ...props,
      components: {
        ...components,
        ...props.components,
      },
    });
  }`;
};
