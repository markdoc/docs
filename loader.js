const Markdoc = require('@stripe-internal/markdoc');
const yaml = require('js-yaml');

// Returning a JSX object is what allows fast refresh to work
const convertToExport = (mdast, frontmatter, text) => {
  return `
  import React from 'react';
  import Markdoc from '@stripe-internal/markdoc';

  const text = ${JSON.stringify(text)}
  
  const frontmatter = ${JSON.stringify(frontmatter)}
  
  const config = {
    nodes: {},
    tags: {},
    functions: {},
    variables: {},
    text,
    ...frontmatter,
  };

  // Convert serialized Markdoc AST into object
  const mdast = Markdoc.fromJSON(JSON.stringify(${JSON.stringify(mdast)}))

  // Convert the AST into a rendered tree
  const nodes = Markdoc.process(mdast, config);
  const content = Markdoc.expand(nodes, config);

  const render = Markdoc.renderers.react(content, React);

  export async function getStaticProps(context) {
    return {
      props: {
        frontmatter,
      }
    }
  }

  // We inline variables here to support fast refresh
  export default function MarkdocContent({}) {
    return render({components: null});
  }`;
};

const tokenizer = new Markdoc.Tokenizer({typographer: true});

module.exports = function loader(source) {
  // Convert raw text to an AST
  const tokens = tokenizer.tokenize(source);
  const mdast = Markdoc.parse(tokens);
  const frontmatter = mdast.attributes.frontmatter
    ? yaml.load(mdast.attributes.frontmatter)
    : {};

  return convertToExport(mdast, frontmatter, source);
};
