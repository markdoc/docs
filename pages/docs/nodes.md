---
title: Nodes
description:
---

# {% $markdoc.frontmatter.title %}

## Getting started

Nodes are elements that Markdoc inherits from Markdown, specifically the [CommonMark specification](https://commonmark.org/).

Custom nodes are defined by passing a custom Node to your [`Config`](/docs/config), like:

```js
import { heading } from './schema/Heading.markdoc';

const config = {
  nodes: {
    heading
  }
};

return Markdoc.render(content, config);
```

where `heading` looks something like:

```js
// ./schema/Heading.markdoc.js

import { Ast } from '@markdoc/markdoc';

export const heading = {
  tag(node) {
    // Determines which HTMl or React component to render
    return `h${node.attributes['level']}`;
  },
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 }
  },
  render(node, config) {
    const attributes = node.renderAttributes(this.attributes);
    const children = node.renderChildren(config);

    const id = generateID(children, attributes);

    return {
      name: 'heading',
      attributes: { ...attributes, id },
      children
    };
  }
};
```

After registering this custom node, you can then use it in your Markdoc, like:

{% side-by-side %}

{% markdoc-example %}

```md
### My header
```

{% /markdoc-example %}

### My header

{% /side-by-side %}

## Options

These are the fields you can use to customize your `Node`

{% table %}

- Option
- Type
- Description {% width="40%" %}

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

## Built-in nodes

Markdoc comes out of the box with built-in nodes for each of the [CommonMark](https://commonmark.org/) types:

- `document`
- `heading`
- `paragraph`
- `hr`
- `image`
- `fence`
- `blockquote`
- `list`
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
- `softbreak`
- `error`
