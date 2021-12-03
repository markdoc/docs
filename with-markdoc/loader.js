const path = require('path');

// Returning a JSX object is what allows fast refresh to work
module.exports = function loader(source) {
  const {pathToSchema, mode = 'static'} = this.getOptions() || {};

  const importPath = path.relative(this.context, pathToSchema);
  const dataFetchingFunction =
    mode === 'server' ? 'getServerSideProps' : 'getStaticProps';

  return `
  import React from 'react';
  import Markdoc from '@stripe-internal/markdoc';
  import * as schema from '${importPath}';

  export async function ${dataFetchingFunction}(context) {
    // TODO move this into Markdoc itself
    const tags = {};
    const nodes = {};
    Object.values(schema).forEach((registration) => {
      if (typeof registration.node === 'string') {
        const {node, component, ...schema} = registration;
        if (nodes[node]) {
          throw new Error(\`Node already declared: \${node}\`);
        }
        nodes[node] = {
          ...schema,
          tag: component,
        };
      } else {
        const {tag, component, ...schema} = registration;
        if (tags[tag]) {
          throw new Error(\`Tag already declared: \${tag}\`);
        }
        tags[tag] = {
          ...schema,
          tag: component,
        };
      }
    });

    const config = {
      functions: {},
      variables: {},
      tags,
      nodes,
    };

    const mdAst = Markdoc.parse(${JSON.stringify(source)});
    // Convert the AST into a rendered tree
    const processed = Markdoc.process(mdAst, config);
    const content = Markdoc.expand(processed, config);

    return {
      props: {
        isMarkdoc: true,
        // Remove undefined — TODO handle this in Markdoc
        content: JSON.parse(JSON.stringify(content)),
        frontmatter: mdAst.attributes.frontmatter,
      }
    }
  }

  export default function MarkdocContent(props) {
    const render = Markdoc.renderers.react(props.content, React);
    return render(props);
  }`;
};
