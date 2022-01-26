---
title: Getting started
description: How to get started with Markdoc
---

## Install Markdoc

Install the Markdoc library:

```bash
npm install @markdoc/markdoc
```

or

```
yarn add @markdoc/markdoc
```

## Import Markdoc 

After you've installed Markdoc, the next step is to import the Markdoc library in your app. 

```js
const Markdoc = require('@markdoc/markdoc');
```

or if you are using ESM:

```js
import Markdoc from '@markdoc/markdoc';
```

## Use Markdoc 

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
