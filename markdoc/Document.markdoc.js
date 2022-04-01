/**
 * Note: we define a custom `document` type here in order to pass the
 * raw Markdoc source text to AST, to be consumed in _app. This is an
 * atypical pattern for Markdoc applications.
 */
import { nodes } from '@markdoc/markdoc';

export const document = {
  ...nodes.document,
  node: 'document',
  render(node, config) {
    return {
      name: 'main',
      attributes: { class: 'document', source: config.source },
      children: node.renderChildren(config)
    };
  }
};
