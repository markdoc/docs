---
title: Common React examples
description:
---

# {% $markdoc.frontmatter.title %}

## Loops

Markdoc does not support writing loops directly in documents. If you need to loop through content, do so in a custom [Node](/docs/nodes) `render` function or in a custom [React component](/docs/render/react).

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
        'The programming language of the code block. Place it after the backticks.'
    }
  }
};

const content = Markdoc.process(content, {
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

## Table-of-contents

#### Collect all headings from the page content

```js
function collectHeadings(nodes, sections = []) {
  nodes.forEach((node) => {
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
        collectHeadings(node.children, sections);
      }
    }
  });

  return sections;
}

const content = Markdoc.process(ast);
const headings = collectHeadings([].concat(processed));
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
const tabs = {
  render: 'Tabs',
  attributes: {},
  render(node, config) {
    const labels = node
      .renderChildren(config)
      .filter((child) => child && child.name === 'Tab')
      .map((tab) => (typeof tab === 'object' ? tab.attributes.label : null));

    return {
      name: this.tag,
      attributes: { labels },
      children: tabs
    };
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
  const [currentTab, setCurrentTab] = React.useState(labels[0]);

  return (
    <TabContext.Provider value={currentTab}>
      <ul>
        {labels.map((label) => (
          <li key={label}>
            <button onClick={() => setCurrentTab(label)}>{label}</button>
          </li>
        ))}
      </ul>
      {children}
    </TabContext.Provider>
  );
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
