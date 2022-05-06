import { transformer } from '@markdoc/markdoc';
export const s = {
  attributes: {
    primary: {}
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const output = [];
    for (const child of node.children) {
      console.log(child);
      if (child.attributes.primary === attributes.primary) {
        output.push(child);
      }
    }
    return transformer.children({ children: output }, config);
  }
};

export const c = {
  attributes: {
    primary: {}
  }
};
