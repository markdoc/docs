---
title: Get started with Markdoc
description: How to get started with Markdoc
---

# {% $markdoc.frontmatter.title %}

Run this command to install the Markdoc library:

```bash
npm install @markdoc/markdoc
```

or

```
yarn add @markdoc/markdoc
```

## Import Markdoc

The next step is to import the library in your app:

```js
const Markdoc = require('@markdoc/markdoc');
```

If you are using ESM:

```js
import Markdoc from '@markdoc/markdoc';
```

## Use Markdoc

This sample shows how to implement Markdoc and render content as HTML. Markdoc also exposes renderers for React, React Static, and Markdoc text.

```js
const ast = Markdoc.parse(source);
const processed = Markdoc.process(ast);
const content = Markdoc.expand(processed);

return Markdoc.renderers.html(content);
```

## Next steps

- Learn Markdoc syntax
- View rendering options
- [Next.js plugin](/docs/nextjs)
