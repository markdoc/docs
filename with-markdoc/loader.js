const glob = require('glob');
const path = require('path');
const Markdoc = require('@stripe-internal/markdoc');

const tokenizer = new Markdoc.Tokenizer({typographer: true});

// Returning a JSX object is what allows fast refresh to work
module.exports = function loader(source) {
  // Convert raw text to an AST
  const tokens = tokenizer.tokenize(source);
  const mdast = Markdoc.parse(tokens);

  const tags = {};
  const nodes = {};
  glob.sync('./components/**/*.markdoc.js').map((file) => {
    const registrations = require(path.resolve(file));
    Object.values(registrations).forEach((registration) => {
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
  });

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
    tags: ${JSON.stringify(tags)},
    nodes: ${JSON.stringify(nodes)},
    functions: {},
    variables: {},
    text,
  };

  export async function getStaticProps(context) {
    return {
      props: {
        isMarkdoc: true,
        mdConfig,
        mdAst,
        mdFrontmatter: frontmatter
      }
    }
  }

  // We inline variables here to support fast refresh
  export default function MarkdocContent(props) {
    return props.children;
  }`;
};
