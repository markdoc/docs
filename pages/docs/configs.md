---
title: Configuration
description: Config objects let you pass options to Markdoc.transform.
---

# {% $markdoc.frontmatter.title %}

This table outlines the various options you can pass to `Markdoc.transform`. Each option adjusts how a document is [transformed](/docs/render#transform) and [rendered](/docs/render#render).

{% table %}

- Key
- Type
- Description

---

- [`nodes`](/docs/nodes)
- {% code %}{ [nodeType: [NodeType](/docs/nodes#built-in-nodes)]: [Schema](https://github.com/markdoc/markdoc/blob/6bcb8a0c48a181ca9df577534d841280646cea09/src/types.ts#L94-L101) }{% /code%}
- Register [custom nodes](/docs/nodes) in your schema

---

- [`tags`](/docs/tags)
- {% code %}{ [tagName: string]: [Schema](https://github.com/markdoc/markdoc/blob/6bcb8a0c48a181ca9df577534d841280646cea09/src/types.ts#L94-L101) }{% /code%}
- Register [custom tags](/docs/tags) in your schema

---

- [`variables`](/docs/variables)
- `{ [variableName: string]: any }`
- Register [variables](/docs/variables) to use in your document

---

- [`functions`](/docs/functions)
- {% code %}{ [functionName: string]: [ConfigFunction](https://github.com/markdoc/markdoc/blob/6bcb8a0c48a181ca9df577534d841280646cea09/src/types.ts#L31-L36) }{% /code %}
- Register [custom functions](/docs/functions) to use in your document

---

- [`partials`](/docs/partials)
- `{ [partialPath: string]: Ast.Node }`
- Register reusable pieces of content to used by the [`partial` tag](/docs/partials)

{% /table %}

### Full example

Here's an example of what a Markdoc config would look like:

```js
const config = {
  nodes: {
    heading: {
      render: 'Heading',
      attributes: {
        id: { type: String },
        level: { type: Number }
      }
    }
  },
  tags: {
    callout: {
      render: 'Callout',
      attributes: {
        title: {
          type: String
        }
      }
    }
  },
  variables: {
    name: 'Dr. Mark',
    frontmatter: {
      title: 'Configuration options'
    }
  },
  functions: {
    includes: {
      transform(parameters, config) {
        const [array, value] = Object.values(parameters);

        return Array.isArray(array) ? array.includes(value) : false;
      }
    }
  },
  partials: {
    'header.md': Markdoc.parse(`# My header`)
  }
};

const content = Markdoc.transform(ast, config);
```
