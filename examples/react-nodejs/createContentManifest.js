import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import glob from 'glob';
const { sync } = glob;
import markdoc from '@markdoc/markdoc';
const { parse } = markdoc;

const parseMarkdocFrontmatter = (ast) => {
  return ast.attributes.frontmatter ? load(ast.attributes.frontmatter) : {};
};

// This creates a mapping between route and parsed Markdoc content.
export function createContentManifest(ROOT_DIR) {
  const files = sync(`${ROOT_DIR}/**/*.md`);

  const contentManifest = {};

  files.forEach((file) => {
    const rawText = readFileSync(file, 'utf-8');
    const ast = parse(rawText);
    const frontmatter = parseMarkdocFrontmatter(ast);

    contentManifest[frontmatter.route] = {
      ast,
      frontmatter
    };
  });

  return contentManifest;
}
