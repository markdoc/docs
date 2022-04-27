---
title: Config reference
---

# {% $markdoc.frontmatter.title %}

This table outlines the various options you can pass to `Markdoc.transform`. These options each adjust how your document will be [transformed](/docs/render#transform) and [rendered](/docs/render#render).

{% table %}

- Key
- Type
- Description

---

- [`nodes`](/docs/nodes)
- `{ [string: NodeType]: Schema }`
- Register [custom nodes](/docs/nodes) in your schema

---

- [`tags`](/docs/tags)
- `{ [string: TagName]: Schema }`
- Register [custom tags](/docs/tags) in your schema

---

- [`variables`](/docs/variables)
- `{ [string: VariableName]: any }`
- Register [variables](/docs/variables) to use in your document

---

- [`functions`](/docs/functions)
- `{ [string: FunctionName]: ConfigFunction }`
- Register [custom functions](/docs/functions) to use in your document

---

- `partials`
- `{ [string: PartialPath]: Ast.Node }`
- Register reusable pieces of content to used by the [`partial` tag](/docs/partials)

{% /table %}

## Example

Here is an example of what a Markdoc config might look like:

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
