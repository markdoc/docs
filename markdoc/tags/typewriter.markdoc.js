import { Typewriter } from '../../components/Typewriter';

export default {
  render: Typewriter,
  attributes: {
    text: { type: String }
  },
  transform(node, config) {
    const children = node.renderChildren(config)?.[0]?.children || [];
    return { name: this.render, children };
  }
};
