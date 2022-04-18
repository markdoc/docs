/**
 * Note: we define a custom `document` type here in order to pass the
 * raw Markdoc source text to AST, to be consumed in _app. This is an
 * atypical pattern for Markdoc applications.
 */
import { nodes } from '@markdoc/markdoc';
import { Document } from '../../components/Document';

export default {
  ...nodes.document,
  render: Document,
  transform(node, config) {
    return {
      name: this.render,
      attributes: { source: config.source },
      children: node.renderChildren(config)
    };
  }
};