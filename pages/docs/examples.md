---
title: Common React examples
description:
---

# {% $markdoc.frontmatter.title %}

## Loops

Markdoc does not support writing loops directly into documents. If you need to loop through content, do so in a custom [Node](/docs/nodes) `render` function or in a custom [React component](/docs/render/react).

```js
export const group = {
  tag: 'Group',
  attributes: {},
  render(node, config) {
    const children = node.renderChildren(config).map((item) => {
      /* Do something with children */
    });

    return new Ast.Tag(
      this.tag,
      node.renderAttributes(this.attributes),
      children
    );
  },
};
```

## Table-of-contents

### Step 1: Collect all headings from the page content

```js
function collectHeadings(node, sections = []) {
  // Match all h1, h2, h3… tags
  if (node.name.match(/h\d/)) {
    const title = node.children[0];

    const attributes = Object.fromEntries(
      node.attributes.map((a) => [a.name, a.value])
    );

    if (typeof title === 'string') {
      sections.push({
        ...attributes,
        level: Number(node.name.slice(1),
      });
    }
  }

  if (node.children) {
    node.children.forEach((child) => collectHeadings(child, sections));
  }
g
  return sections;
}

const processed = Markdoc.process(ast);
const content = Markdoc.expand(processed);
const headings = collectHeadings(processed);
```

### Step 2: Render the relevant headers in a list

```js
function TableOfContents({ headings }) {
  const items = headings.filter((item) => [2, 3].includes(item.level));

  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```
