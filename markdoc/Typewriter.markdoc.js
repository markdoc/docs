// @flow

import { Typewriter } from '../components/Typewriter';

export const typewriter = {
  Component: Typewriter,
  attributes: {
    text: { type: String }
  },
  render(node, config) {
    const children = node.renderChildren(config)?.[0]?.children || [];
    return { name: this.tag, children };
  }
};
