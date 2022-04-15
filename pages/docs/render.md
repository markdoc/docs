---
title: Phases of rendering
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc has 3 phases of rendering: `parse`, `process`, and `render`. Each phase operates on the output of the previous phases.

Markdoc also includes a `validate` function, which you can run separately from the render phases to confirm the Markdoc document is valid.  
See the [validation docs](/docs/validation) for more info.

## Parse

```js
parse(string) => AstNode
```

Parse transforms a raw string into an [abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) representing your Markdoc document. The AST contains information about your content, including where each piece of content exists within the document.

An example AST might look like this:

```js
{
  "type": "document",
  "attributes": {},
  "children": [
    {
      "type": "paragraph",
        "attributes": {},
        "children": [...],
        "lines": [0, 2],
        "location": {
          "start": {
            "line": 0
          },
          "end": {
            "line": 2
          }
        },
        "errors": [],
        "inline": false,
    }
  ],
  "lines": [],
  "errors": [],
  "inline": false
}
```

Check this out for yourself in the [developer playground](/sandbox?mode=ast).

AST node instances also include helpful functions, like `walk`, which can be useful for traversing and mutating your AST.

```js
const ast = Markdoc.parse(document);

for (const node of document.walk()) {
  // do something with each node
}
```

## Process

```js
process(string | AstNode | AstNode[], ?Config) => RenderTreeNode | RenderTreeNode[]
```

Process takes an abstract syntax tree and transforms it into a render tree, a serializable intermediate representation of what will eventually be rendered. This object is useful for computing things like a [table-of-contents](/docs/examples#table-of-contents), or passing over the wire to your client.

The process step is also responsible for resolving variables into static, scalar values (string, boolean, object, etc.).

An example render tree might look like this:

```js
[
  {
    name: 'h1',
    attributes: { id: 'Header' },
    children: ['Header'],
    inline: false
  },
  {
    name: 'p',
    attributes: {},
    children: ['This is a paragraph'],
    inline: false
  }
];
```

You can see a more advanced render tree in the [developer playground](/sandbox?mode=process).

## Render

```js
render(
  string | AstNode | RenderTreeNode | RenderTreeNode[],
  ?Config,
  'html' | 'react' | 'reactStatic' = 'html'
) => mixed
```

Render takes in a render-tree and transforms it into rendered output. For `html`, that means creating an HTMl document as a string. For `react`, this means creating a [React element](https://reactjs.org/docs/render-elements.html).

You can create your own renderer by creating a function that takes in a render tree as parameter and returns your desired output.

An example `html` output might look like this:

```html
<h1>Getting started</h1>

<p>Run this command to install the Markdoc library:</p>
```

### HTML

Markdoc supports HTML rendering out-of-the-box. Try HTML rendering out yourself in the [developer playground](/sandbox?mode=html).

To render HTML, first create a render tree from your content by calling `process`:

{% markdoc-example %}

```js
const doc = `
# Getting started

Run this command to install the Markdoc library:
`;

const content = Markdoc.process(doc);
```

{% /markdoc-example %}

\
Then, call `Markdoc.renderers.html` with your render tree, which will create the corresponding HTML document.

{% side-by-side %}

```js
const express = require('express');
const Markdoc = require('@markdoc/markdoc');

const app = express();

app.get('/docs/getting-started', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        ${Markdoc.renderers.html(content)}
        <!-- or --> 
        ${Markdoc.render(content, {}, 'html')}
      </body>
    </html>
  `);
});
```

{% item %}

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Getting started</h1>
    <p>Run this command to install the Markdoc library:</p>
  </body>
</html>
```

{% /item %}

{% /side-by-side %}

### React

Markdoc supports rendering [React](https://reactjs.org/) out-of-the-box. You can see the React renderer in action in the [developer playground](/sandbox?mode=preview).

To render React, first create a render tree from your document calling `process`. This can be done from the server or client.

{% markdoc-example %}

```js
const tags = {
  callout: {
    render: 'Callout',
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

\
Then, call `Markdoc.renderers.react` with the render tree from your client application. Along with `content` and `React`, you'll need to provide the `components` object as an argument. The `components` object specifies a mapping from your tags and nodes to the corresponding React component.

{% side-by-side %}

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

{% item %}

#### Rendered output

{% callout %}
Attention, over here!
{% /callout %}
{% /item %}

{% /side-by-side %}
