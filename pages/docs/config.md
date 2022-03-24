---
title: Configuration options
---

# {% $markdoc.frontmatter.title %}

This table outlines the various options you can pass to `Markdoc.process`:

{% table %}

- Key
- Type
- Description

---

- `nodes`
- `{ [string: NodeType]: Schema }`
- Register [custom nodes](/docs/nodes) in your schema

---

- `tags`
- `{ [string: TagName]: Schema }`
- Register [custom tags](/docs/tags) in your schema

---

- `variables`
- `{ [string: VariableName]: any }`
- Register [variables](/docs/variables) to use in your document

---

- `functions`
- `{ [string: FunctionName]: ConfigFunction }`
- Register [custom functions](/docs/functions) to use in your document

---

- `partials`
- `{ [string: PartialPath]: Ast.Node }`
- Register reusable pieces of content to used by the [`partial` tag](/docs/partials)

{% /table %}

## Example

```js
const config = {
  nodes: {
    heading: {
      tag: 'Heading',
      attributes: {
        id: { type: String },
        level: { type: Number }
      }
    }
  },
  tags: {
    callout: {
      tag: 'Callout',
      attributes: {
        title: {
          type: String,
          description: 'The title displayed at the top of the callout'
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
      render(parameters, config) {
        const [array, value] = Object.values(parameters);

        return Array.isArray(array) ? array.includes(value) : false;
      }
    }
  },
  partials: {
    '/partials/header.md': Markdoc.parse(`# My header`)
  }
};

const content = Markdoc.process(ast, config);
```
