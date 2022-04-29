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
    const base = nodes.heading.transform(node, config);
    base.attributes.id = getAnchor(base.children, base.attributes);
    return base;
  }
};
