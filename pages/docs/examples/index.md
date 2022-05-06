---
title: Common examples
description:
---

# {% $markdoc.frontmatter.title %}

With Markdoc, it's easy to add functionality you'd commonly associate with documentation sites. The examples below cover loops, syntax highlighting, tabs, and more.

If you're looking for other sample code, check out our collection of [example repos](https://github.com/markdoc/docs/tree/main/examples), or view the [source code for this site](https://github.com/markdoc/docs).

## Loops

Markdoc does not support writing loops directly in documents. If you need to loop through content, do so in a custom [Node](/docs/nodes) `render` function or in a custom [React component](/docs/render#react).

```js
import { Tag } from '@markdoc/markdoc';

export const group = {
  render: 'Group',
  attributes: {},
  transform(node, config) {
    const children = node.transformChildren(config).map((item) => {
      /* Do something with children */
    });
    const attributes = node.transformAttributes(config);
    return new Tag('Group', attributes, children);
  }
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
  render: 'Fence',
  attributes: {
    language: {
      type: String,
      description:
        'The programming language of the code block. Place it after the backticks.'
    }
  }
};

const content = Markdoc.transform(ast, {
  nodes: {
    fence
  }
});

Markdoc.renderers.react(content, React, {
  components: {
    Fence
  }
});
```

## Switch statements

You can create your own `switch`/`case` semantics with custom Markdoc tags.

```js
import { transformer } from '@markdoc/markdoc';

const config = {
  tags: {
    switch: {
      attributes: { primary: { render: false } },
      transform(node, config) {
        const attributes = node.transformAttributes(config);

        const child = node.children.find(
          (child) => child.attributes.primary === attributes.primary
        );

        return child ? transformer.node(child, config) : [];
      }
    },
    case: {
      attributes: { primary: { render: false } }
    }
  }
};
```

which can then be used in your document:

{% markdoc-example %}

```md
{% switch $item %}

{% case 1 %}
Case 1
{% /case %}

{% case 2 %}
Case 2
{% /case %}

{% /switch %}
```

{% /markdoc-example %}

## Table-of-contents

#### Collect all headings from the page content

```js
function collectHeadings(node, sections = []) {
  if (node) {
    // Match all h1, h2, h3… tags
    if (node.name.match(/h\d/)) {
      const title = node.children[0];

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title
        });
      }
    }

    if (node.children) {
      for (const child of node.children) {
        collectHeadings(child, sections);
      }
    }
  }

  return sections;
}

const content = Markdoc.transform(ast);
const headings = collectHeadings(content);
```

#### Render the headings in a list

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

#### Add IDs to the headings using ID [annotations](/docs/syntax#annotations)

{% markdoc-example %}

```md
# My header {% #my-id %}
```

{% /markdoc-example %}

## Tabs

#### Create the Markdoc tags

```js
import { Tag } from '@markdoc/markdoc';

const tabs = {
  render: 'Tabs',
  attributes: {},
  transform(node, config) {
    const labels = node
      .transformChildren(config)
      .filter((child) => child && child.name === 'Tab')
      .map((tab) => (typeof tab === 'object' ? tab.attributes.label : null));

    return new Tag(this.render, { labels }, tabs);
  }
};

const tab = {
  render: 'Tab',
  attributes: {
    label: {
      type: String
    }
  }
};

const config = {
  tags: {
    tabs,
    tab
  }
};
```

#### Create React component

Create a `Tab` and `Tabs` React component which map to the `tab` and `tabs` tag.

{% side-by-side %}

```js
// components/Tabs.js

import React from 'react';

export const TabContext = React.createContext();

export const Tabs = ({ labels, children }: Props) => {
  const [
    currentTab,
    setCurrentTab
  ] = React.useState(labels[0]);

  {% comment %}
  prettier-ignore-start
  {% /comment %}
  return (
    <TabContext.Provider value={currentTab}>
      <ul>
        {labels.map((label) => (
          <li key={label}>
            <button onClick={() => setCurrentTab(label)}>
              {label}
            </button>
          </li>
        ))}
      </ul>
      {children}
    </TabContext.Provider>
  );
  {% comment %}
  prettier-ignore-end
  {% /comment %}
};
```

```js
// components/Tab.js

import React from 'react';
import { TabContext } from './Tabs';

export const Tab = ({ label, children }: Props) => {
  const currentTab = React.useContext(TabContext);

  if (label !== currentTab) {
    return null;
  }

  return children;
};
```

{% /side-by-side %}

and use the tags in your document.

{% markdoc-example %}

```md
{% tabs %}

{% tab label="React" %}
React content goes here
{% /tab %}

{% tab label="HTMl" %}
HTML content goes here
{% /tab %}

{% /tabs %}
```

{% /markdoc-example %}
