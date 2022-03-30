// @flow

import { Typewriter } from '../components/Typewriter';

export const typewriter = {
  Component: Typewriter,
  attributes: {
    text: { type: String }
  },
  render(node, config) {
    const [{ children }] = node.renderChildren(config);
    return { name: this.tag, children };
  }
};
