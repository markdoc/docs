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

Next, import the library in your app:

```js
const Markdoc = require('@markdoc/markdoc');
```

If you are using ESM:

```js
import Markdoc from '@markdoc/markdoc';
```

## Use Markdoc

Then call the various Markdoc functions to render your content.

```js
const ast = Markdoc.parse(source);
const content = Markdoc.process(ast, config);

return Markdoc.render(content, config, 'html');
```

## Next steps

- Learn Markdoc syntax
- View rendering options
- [Next.js plugin](/docs/nextjs)
