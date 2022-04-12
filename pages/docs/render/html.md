---
title: Rendering HTML
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc comes out-of-the-box with an HTML renderer. You can try it out yourself in the [developer playground](/sandbox?mode=html).

First create a Markdoc render tree by calling `process`.

{% markdoc-example %}

```js
const doc = `
# Getting started

Run this command to install the Markdoc library:
`;

const content = Markdoc.process(doc);
```

{% /markdoc-example %}

Then, call `Markdoc.renderers.html` with your render tree.

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
