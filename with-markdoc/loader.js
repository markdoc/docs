const Markdoc = require('@stripe-internal/markdoc');

// TODO consider parsing the frontmatter as YAML for Markdoc version,
// and using specific values for various configs (e.g. <head> values)

// Returning a JSX object is what allows fast refresh to work
module.exports = async function loader(source) {
  const {pathToSchema, mode = 'static'} = this.getOptions() || {};

  const ast = Markdoc.parse(source);
  const errors = Markdoc.validate(ast);

  if (errors.length) {
    const error = new Error(
      errors
        .filter((e) => e.error.level === 'critical')
        .map((e) => e.error.message)
        .join('\n\n')
    );
    throw error;
  }

  const partials = {};
  for (const node of ast.walk()) {
    const file = node.attributes.file;
    if (
      node.type === 'tag:partial' &&
      typeof file === 'string' &&
      !partials[file]
    ) {
      partials[file] = await new Promise((res, rej) => {
        this.resolve(this.context, file, (error, filepath) => {
          if (error) {
            rej(error);
          } else {
            // parsing is not done here because then we have to serialize and reload from JSON at runtime
            res(this.fs.readFileSync(filepath, 'utf8'));
          }
        });
      });
    }
  }

  const importPath = require.resolve(pathToSchema);
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

    const config = {
      ...transformSchema(schema),
      partials,
    }

    // Convert the AST into a rendered tree
    const processed = Markdoc.process(ast, config);
    const content = Markdoc.expand(processed, config);

    return {
      props: {
        isMarkdoc: true,
        // Remove undefined — TODO handle this in Markdoc
        content: JSON.parse(JSON.stringify(content)),
        frontmatter: ast.attributes.frontmatter || null,
      }
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
