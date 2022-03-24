---
title: Rendering a React component
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc comes out-of-the-box with a React renderer. The only requirement to render React component is to tell Markdoc which components to use for each [tag](/docs/tags) and [node](/docs/nodes).

You can see the React renderer in action in the [developer playground](/sandbox?mode=preview).

## On the server or client

First create a Markdoc render tree by calling `process`.

{% markdoc-example %}

```js
const tags = {
  callout: {
    tag: 'Callout',
    attributes: {}
  }
};

const document = `
{% callout %}
Attention, over here!
{% /callout %}
`;

const content = Markdoc.process(document, { tags });
```

{% /markdoc-example %}

## On the client

Then, call `Markdoc.renderers.react` with your render tree.

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

which will render your Callout component like this:

{% callout %}
Attention, over here!
{% /callout %}
