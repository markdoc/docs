const glob = require('glob');
const path = require('path');
const Markdoc = require('@stripe-internal/markdoc');
const yaml = require('js-yaml');

const tokenizer = new Markdoc.Tokenizer({typographer: true});

// Returning a JSX object is what allows fast refresh to work
module.exports = function loader(source) {
  // Convert raw text to an AST
  const tokens = tokenizer.tokenize(source);
  const mdAst = Markdoc.parse(tokens);

  const tags = {};
  const nodes = {};
  glob.sync('./**/*.markdoc.js').map((file) => {
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

  const mdConfig = {
    tags,
    nodes,
    text: source,
    functions: {},
    variables: {},
  };

  const mdFrontmatter = mdAst.attributes.frontmatter
    ? yaml.load(mdAst.attributes.frontmatter)
    : {};

  const props = {
    isMarkdoc: true,
    mdConfig,
    mdAst,
    mdFrontmatter,
  };

  return `
  export async function getStaticProps(context) {
    return {
      props: ${JSON.stringify(props)}
    }
  }

  export default function MarkdocContent(props) {
    return props.children;
  }`;
};
