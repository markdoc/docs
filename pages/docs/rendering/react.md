---
title: How to render a react component with Markdoc
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc supports React component rendering out-of-the-box. To render React components with Markdoc, you'll need to specify when to use a component with a tag and/or node. Similar to HTML rendering, the process is two steps. First, you create a render tree from your content, along with any associated tags. Then you call the renderer to output the contents of that tree as a React component.

Follow the steps below or try out React rendering in the [developer playground](/sandbox?mode=preview).

## Create a render tree

Create a Markdoc render tree by calling `process`. This can be done from the server or client. In the example below, the `{ tags }` object is passed as an argument to `process`.

{% markdoc-example %}

```js
const tags = {
  callout: {
    tag: 'Callout',
    attributes: {}
  }
};

const doc = `
{% callout %}
Attention, over here!
{% /callout %}
`;

const content = Markdoc.process(doc, { tags });
```

{% /markdoc-example %}

## Render a React component

Call `Markdoc.renderers.react` with your render tree from the client. Along with `content` and `React`, you'll need to provide the `components` object as an argument.

```js
import Markdoc from '@markdoc/markdoc';
import React from 'react'; // or 'preact'

function Callout({ children }) {
  return <div className="callout">{children}</div>;
}

function MyApp() {
  return Markdoc.renderers.react(content, React, {
    components: {
      Callout: Callout
    }
  });
}
```

When rendered, the React component will look like this:

{% callout %}
Attention, over here!
{% /callout %}
