---
title: Nodes
description:
---

# {% $markdoc.frontmatter.title %}

## Getting started

Nodes are elements that Markdoc inherits from Markdown, specifically the [CommonMark specification](https://commonmark.org/).

Custom nodes are defined by passing a custom Node to your [`Config`](/docs/syntax#config), like:

```js
import { heading } from './schema/Heading.markdoc';

const config = {
  nodes: {
    heading
  }
};

const content = Markdoc.transform(doc, config);

const children = Markdoc.renderers.react(content, React, { components });
```

where `heading` looks something like:

```js
// ./schema/Heading.markdoc.js

import { Tag } from '@markdoc/markdoc';

export const heading = {
  tag(node) {
    // Determines which HTML or React component to render
    return `h${node.attributes['level']}`;
  },
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    const id = generateID(children, attributes);

    return new Tag('heading', { ...attributes, id }, children);
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

- `render`
- `string | Node => string`
- Name of the output (e.g. HTML tag, React component name) to render

---

- `children`
- `string[]`
- Determines which tag or node types are allowed to be rendered as children of this node. Used in schema validation.

---

- `attributes`
- `{ [string]: SchemaAttribute }`
- Determines which [values (and their types)](/docs/attributes) are allowed to be passed to this node.

---

- `transform`
- ```js
  (Ast.Node, ?Options) =>
    | RenderableTreeNode
    | RenderableTreeNode[]
    | null
  ```
- Customize the Markdoc transform function for this node, returning the custom output you want to eventually render. This is called during the [`transform` step](/docs/render#transform).

---

- `validate`
- ```js
  (Node, ?Options) =>
    ValidationError[];
  ```
- Extend Markdoc validation. Used to validate that the content meets validation requirements. This is called during the [`validate` step](/docs/render#validate)

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

## Next steps

- [Create custom tags](/docs/tags)
- [Customize nodes with annotations](/docs/syntax#annotations)
