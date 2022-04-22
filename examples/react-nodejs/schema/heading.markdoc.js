const { nodes } = require('@markdoc/markdoc');

function getAnchor(children, attributes) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

module.exports = {
  ...nodes.heading,
  transform(node, config) {
    const attributes = node.renderAttributes(this.attributes);
    const children = node.renderChildren(config);
    const id = getAnchor(children, attributes);

    return {
      name: this.render(node),
      attributes: { ...attributes, id },
      children
    };
  }
};
