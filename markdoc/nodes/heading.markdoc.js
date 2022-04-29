import { Tag } from '@markdoc/markdoc';
import { Heading } from '../../components/Heading';

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

export default {
  render: Heading,
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = getAnchor(children, attributes);

    return new Tag(this.render, { ...attributes, id }, children);
  }
};
