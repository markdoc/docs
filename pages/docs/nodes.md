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
