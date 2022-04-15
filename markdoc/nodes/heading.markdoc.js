import { Heading } from '../../components/Heading';

const getAnchor = (children, attributes) => {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

export default {
  render: Heading,
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String }
  },
  transform(node, config) {
    const attributes = node.renderAttributes(this.attributes);
    const children = node.renderChildren(config);
    const id = getAnchor(children, attributes);

    return {
      name: this.render,
      attributes: { ...attributes, id },
      children
    };
  }
};
