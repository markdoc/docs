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

    return {
      name: 'Group',
      attributes: node.renderAttributes(this.attributes),
      children,
    );
  },
};
```

## Syntax highlighting

You can hook up syntax highlighting for code blocks by creating a custom `fence` [node](/docs/nodes). This example shows how to do so with [Prism](https://prismjs.com/).

```js
import 'prismjs';
import 'prismjs/themes/prism.css';

import Prism from 'react-prism';

export function Fence({ children, language }) {
  return (
    <Prism key={language} component="pre" className={`language-${language}`}>
      {children}
    </Prism>
  );
}

const fence = {
  tag: 'Fence',
  attributes: {
    language: {
      type: String,
      description:
        'The programming language of the code block. Place it after the backticks.',
    },
  },
};

const processed = Markdoc.process(content, {
  nodes: {
    fence,
  },
});

Markdoc.renderers.react(processed, React, {
  components: {
    Fence,
  },
});
```

## Table-of-contents

#### Step 1: Collect all headings from the page content

```js
function collectHeadings(nodes, sections = []) {
  nodes.forEach((node) => {
    // Match all h1, h2, h3… tags
    if (node.name.match(/h\d/)) {
      const title = node.children[0];

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title,
        });
      }

      if (node.children) {
        collectHeadings(node.children, sections);
      }
    }
  });

  return sections;
}

const content = Markdoc.process(ast);
const headings = collectHeadings([].concat(processed));
```

#### Step 2: Render the relevant headers in a list

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
