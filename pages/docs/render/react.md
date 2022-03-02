---
title: Rendering a React component
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc comes out-of-the-box with a React renderer. The only requirement to render React component is to tell Markdoc which components to use for each [tag](/docs/tags) and [node](/docs/nodes).

## On the server or client

First create a Markdoc render tree by calling `process`.

{% markdoc-example %}

```js
const tags = {
  callout: {
    tag: 'Callout',
    attributes: {},
  },
};

const content = `
{% callout %}
Attention, over here!
{% /callout %}
`;

const renderTree = Markdoc.process(content, { tags });
```

{% /markdoc-example %}

## On the client

Then, call `Markdoc.renderers.react` with your expanded render tree.

```js
import Markdoc from '@stripe-internal/markdoc';
import React from 'react'; // or 'preact'

function Callout({ children }) {
  return <div className="callout">{children}</div>;
}

function MyApp() {
  return Markdoc.renderers.react(renderTree, React, {
    components: {
      Callout: Callout,
    },
  });
}
```

which will render your Callout component like this:

{% callout %}
Attention, over here!
{% /callout %}
