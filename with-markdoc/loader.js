const Markdoc = require('@stripe-internal/markdoc');
const yaml = require('js-yaml');

// Returning a JSX object is what allows fast refresh to work
module.exports = function loader(source) {
  const {schema = {}, ...options} = this.getOptions() || {};

  // TODO move this into Markdoc itself
  const tags = {};
  const nodes = {};
  Object.values(schema).forEach((registration) => {
    if (typeof registration.node === 'string') {
      const {node, component, ...schema} = registration;
      if (nodes[node]) {
        throw new Error(`Node already declared: ${node}`);
      }
      nodes[node] = {
        ...schema,
        tag: component,
      };
    } else {
      const {tag, component, ...schema} = registration;
      if (tags[tag]) {
        throw new Error(`Tag already declared: ${tag}`);
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
    ...options,
    tags,
    nodes,
  };

  const mdAst = Markdoc.parse(source);

  // Convert the AST into a rendered tree
  const processed = Markdoc.process(mdAst, config);
  const content = Markdoc.expand(processed, config);

  const frontmatter = mdAst.attributes.frontmatter
    ? yaml.load(mdAst.attributes.frontmatter)
    : {};

  return `
  import React from 'react';
  import Markdoc from '@stripe-internal/markdoc';

  export async function getStaticProps(context) {
    const content = ${JSON.stringify(content)};

    return {
      props: {
        isMarkdoc: true,
        content,
        frontmatter: ${JSON.stringify(frontmatter)},
      }
    }
  }

  export default function MarkdocContent(props) {
    const render = Markdoc.renderers.react(props.content, React);
    return render(props);
  }`;
};
