const fs = require('fs');
const path = require('path');

const Markdoc = require('@stripe-internal/markdoc');

const tokenizer = new Markdoc.Tokenizer({typographer: true});

// Returning a JSX object is what allows fast refresh to work
module.exports = function loader(source) {
  // Convert raw text to an AST
  const tokens = tokenizer.tokenize(source);
  const mdast = Markdoc.parse(tokens);

  return `
  import React from 'react';
  import Markdoc from '@stripe-internal/markdoc';
  import yaml from 'js-yaml';
  
  const text = ${JSON.stringify(source)}
  const mdAst = ${JSON.stringify(mdast)}

  const frontmatter = mdAst.attributes.frontmatter
    ? yaml.load(mdAst.attributes.frontmatter)
    : {};
  
  const mdConfig = {
    nodes: {},
    tags: {},
    functions: {},
    variables: {},
    text,
    frontmatter,
  };

  export async function getStaticProps(context) {
    return {
      props: {
        isMarkdoc: true,
        mdConfig,
        mdAst,
      }
    }
  }

  // We inline variables here to support fast refresh
  export default function MarkdocContent(props) {
    return props.children;
  }`;
};
