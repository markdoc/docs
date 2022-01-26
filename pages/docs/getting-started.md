---
title: Getting started
description: How to get started with Markdoc
---

# {% $frontmatter.title %}

Follow these steps to get started with Markdoc.

1. Install the Markdoc library:

   ```bash
   ❯ npm install @markdoc/markdoc
   ```

   or

   ```bash
   ❯ yarn add @markdoc/markdoc
   ```

2. Import the library in your app:

   ```js
   const Markdoc = require('@markdoc/markdoc');
   ```

   or if you are using ESM:

   ```js
   import Markdoc from '@markdoc/markdoc';
   ```

3. Use Markdoc in your project

   ```js
   const ast = Markdoc.parse(source);

   const config = {
     // tags: {},
     // nodes: {},
     // functions: {},
     // variables: {},
     // ...
   };

   const processed = Markdoc.process(ast, config);
   const content = Markdoc.expand(processed, config);

   return Markdoc.renderers.html(content);
   ```
