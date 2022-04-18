const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');

const parseMarkdocFrontmatter = (ast) => {
  return ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};
};

const createContentManifest = () => {
  const files = fs.readdirSync(path.join(__dirname, 'content'));
  const contentManifest = {};
  files.forEach((file) => {
    const rawText = fs.readFileSync(file, 'utf-8');

    const ast = Markdoc.process(rawText);
    const frontmatter = parseMarkdocFrontmatter(ast);

    contentManifest[frontmatter.route] = {
      ast,
      frontmatter
    };
  });

  return contentManifest;
};

module.exports = { createContentManifest };
