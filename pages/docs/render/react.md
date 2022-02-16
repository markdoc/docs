---
title: Rendering a React component
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc comes out-of-the-box with a React renderer. The only requirement to render React component is to tell Markdoc which components to use for each [tag](/docs/tags) and [node](/docs/nodes).

## On the server or client

{% comment %}
TODO: this will be `process` in the future
{% /comment%}
First create a Markdoc render tree by calling `expand`.

{% markdoc-example %}

```js
const tags = {
  callout: {
    tag: 'callout',
    attributes: {},
  },
};

const content = `
{% callout %}
Attention, over here!
{% /callout %}
`;

const renderTree = Markdoc.expand(content, { tags });
```

{% /markdoc-example %}

## On the client

Then, call `Markdoc.renderers.react` with your expanded render tree.

```js
import Markdoc from '@stripe-internal/markdoc';
import React from 'react'; // or 'preact'

function Callout({ children }) {
  return <div class="callout">{children}</div>;
}

function MyApp() {
  return Markdoc.renderers.react(renderTree, React, {
    components: {
      callout: Callout,
    },
  });
}
```

which render your Callout component like this:

{% callout %}
Attention, over here!
{% /callout %}
