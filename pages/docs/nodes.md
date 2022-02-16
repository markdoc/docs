---
title: Nodes
description:
---

# {% $markdoc.frontmatter.title %}

Nodes are elements that Markdoc inherits from Markdown, specifically the [CommonMark specification](https://commonmark.org/). The following is a list of elements that can be overwritten or customized.

- `header` (`h1`, `h2`, and so on)
- `paragraph`
- `hr`
- `image`
- `fence`
- `blockquote`
- `list` (`li`, `ul`, `ol`)
- `item`
- `table`
- `thead`
- `tbody`
- `tr`
- `td`
- `th`
- `inline`
- `strong`
- `em`
- `link`
- `code`
- `text`
- `hardbreak`
- `error`

{% comment %}
These pages do this well:
https://mdxjs.com/table-of-components/
https://www.gatsbyjs.com/docs/how-to/routing/customizing-components/
{% /comment %}

## Options

{% table %}

- Option
- Type
- Description

---

- `tag`
- `string | Node => string`
- Name of the HTML tag or React component to render.

---

- `children`
- `string[]`
- Determines which tag or node types are allowed to be rendered as children of this node. Used in schema validation.

---

- `attributes`
- `{ [string]: SchemaAttribute }`
- Determines which values (and their types) are allowed to be passed to this node.

---

- `render`
- `(Node, ?Options) => RenderTag | RenderTag[] | null`
- Customize the Markdoc render function for this node, returning the custom output you want to render. This is called during the [`process` step](/docs/render/overview#process).

---

- `validate`
- `(Node, ?Options) => ValidationError[];`
- Extend Markdoc validation. Used to validate that the content meets validation requirements. This is called during the [`validate` step](/docs/render/overview#validate)

{% /table %}

## How to customize a node

First, create a custom node definition

```js
// ./schema/heading.js

import { Ast } from '@stripe-internal/markdoc';

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

export const heading = {
  tag(node) {
    return `h${node.attributes['level']}`;
  },
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
  },
  render(node, config) {
    const attributes = node.renderAttributes(this.attributes);
    const children = node.renderChildren(config);

    const id = getAnchor(children, attributes);

    return new Ast.Tag(this.tag, { ...attributes, id }, children);
  },
};
```

Then, pass your node definition to your `Config` object

```js
import { heading } from './schema/heading';

const config = {
  nodes: {
    heading,
  },
};

return Markdoc.render(content, config);
```

Finally, use your custom nodes in your Markdoc content.

{% markdoc-example %}

```md
# My header
```

{% /markdoc-example %}
