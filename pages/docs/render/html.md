---
title: How to render HTML with Markdoc
description:
---

# {% $markdoc.frontmatter.title %}


Markdoc supports HTML rendering out-of-the-box. The process is two steps. Create a render tree from your content, then call the renderer to output the contents of that tree as an HTML document. 

Follow the steps below or try out HTML rendering in the [developer playground](/sandbox?mode=html).

## Create a render tree

Create a Markdoc render tree by calling `process`.

{% markdoc-example %}

  ```js
  const doc = `
  # Getting started

  Run this command to install the Markdoc library:
  `;

  const content = Markdoc.process(doc);
  ```

  {% /markdoc-example %}

## Render HTML

Call `Markdoc.renderers.html` with your render tree.

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

From the sample above, the following HTML document is created: 

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Getting started</h1>
    <p>Run this command to install the Markdoc library:</p>
  </body>
</html>
```