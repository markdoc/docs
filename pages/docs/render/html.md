---
title: Rendering HTML
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc comes out-of-the-box with an HTML renderer. You can try it out yourself in our [developer playground](/sandbox).

{% comment %}
TODO: this will be `process` in the future
{% /comment%}
First create a Markdoc render tree by calling `expand`.

{% markdoc-example %}

```js
const content = `
# Getting started

Run this command to install the Markdoc library:
`;

const renderTree = Markdoc.expand(content);
```

{% /markdoc-example %}

Then, call `Markdoc.renderers.html` with your expanded render tree.

```js
const express = require('express');
const Markdoc = require('@stripe-internal/markdoc');

const app = express();

app.get('/docs/getting-started', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        ${Markdoc.renderers.html(renderTree)}
      </body>
    </html>
  `);
});
```

which renders HTML that looks like this:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Getting started</h1>

    <p>Run this command to install the Markdoc library:</p>
  </body>
</html>
```
