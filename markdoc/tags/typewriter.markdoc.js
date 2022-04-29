import { Tag } from '@markdoc/markdoc';
import { Typewriter } from '../../components/Typewriter';

export default {
  render: Typewriter,
  attributes: {
    text: { type: String }
  },
  transform(node, config) {
    const children = node.transformChildren(config)?.[0]?.children || [];
    return new Tag(this.render, {}, children);
  }
};
