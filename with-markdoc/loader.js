const Markdoc = require('@stripe-internal/markdoc');
const yaml = require('js-yaml');

const tokenizer = new Markdoc.Tokenizer({typographer: true});

// Returning a JSX object is what allows fast refresh to work
module.exports = function loader(source) {
  // Convert raw text to an AST
  const tokens = tokenizer.tokenize(source);
  const mdAst = Markdoc.parse(tokens);

  const frontmatter = mdAst.attributes.frontmatter
    ? yaml.load(mdAst.attributes.frontmatter)
    : {};

  const props = {
    isMarkdoc: true,
    frontmatter,
  };

  // TODO consider moving all calculations into here
  return `
  import React from 'react';
  import Markdoc from '@stripe-internal/markdoc';

  export async function getStaticProps(context) {
    return {
      props: ${JSON.stringify(props)}
    }
  }

  export default function MarkdocContent(props) {
    // Convert the AST into a rendered tree
    const processed = Markdoc.process(Markdoc.fromJSON(JSON.stringify(${JSON.stringify(
      mdAst
    )})), props.config);
    const content = Markdoc.expand(processed, props.config);
    const render = Markdoc.renderers.react(content, React);
    return render(props);
  }`;
};
