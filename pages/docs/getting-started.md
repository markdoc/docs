---
title: Get started with Markdoc
description: How to get started with Markdoc
---

# {% $markdoc.frontmatter.title %}

Follow the instructions below to install Markdoc. If you're looking for the fastest way to get started, check out [using Next.js with Markdoc](/docs/nextjs).

## Install Markdoc

Install the Markdoc library:

```shell
npm install @markdoc/markdoc
```

or

```shell
yarn add @markdoc/markdoc
```

## Import Markdoc

Import the Markdoc library in your app:

```js
const Markdoc = require('@markdoc/markdoc');
```

If you are using ESM:

```js
import Markdoc from '@markdoc/markdoc';
```

## Use Markdoc

Call the `parse`, `transform` and `render` Markdoc functions to render your content.

```js
const source = '# Markdoc';

const ast = Markdoc.parse(source);
{% comment %}
// prettier-ignore
{% /comment %}
const content = Markdoc.transform(ast, /* [config](/docs/config) */);

const html = Markdoc.renderers.html(content);
```

## Next steps

- [Learn Markdoc syntax](/docs/syntax)
