---
title: Using Markdoc with Next.js
description: Learn how to integrate Markdoc into a Next.js project.
---

# {% $markdoc.frontmatter.title %}

Using the `next-markdoc` package/plugin allows you to create custom `.md` and `.mdoc` pages in your Next.js apps, and automatically render them with `markdoc`.

## Before you get started

This guide assumes that you already have a Next.js app. If you are starting from scatch, follow the steps in [Getting Started](https://nextjs.org/docs).

## Setup

The first thing you'll need to do is install `next-markdoc` and add it to your project's config.

1. From your project, run this command to install `next-markdoc`:
   ```bash
   npm install @stripe-internal/next-markdoc
   ```
2. With your favorite IDE, open `next.config.js` and add the following code:

   ```js
   const withMarkdoc = require('@stripe-internal/next-markdoc');

   module.exports = withMarkdoc(/* options */)({
     pageExtensions: ['js', 'md'],
   });
   ```

3. Create a new markdown file in `pages/docs` named `getting-started.md`.

   ```
   pages
   ├── _app.js
   ├── docs
   │   └── getting-started.md
   ├── index.js
   ```

4. Add the following to `getting-started.md`:

   ```
   ---
   title: Get started with Markdoc
   description: How to get started with Markdoc
   ---

   # Get started with Markdoc
   ```

## Options

You can pass options to Markdoc to adjust how the plugin behaves.

{% table %}

- Option
- Type
- Description

---

- `schemaPath`
- `string`
- Path to your Markdoc schema folder. See [schema customization](#schema-customization).

---

- `mode`
- `'static' | 'server'`
- Determines whether the generated Markdoc pages use [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) or [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props).

---

- `config`
- `Node => Promise<Object>`
- An asynchronous function called at build time. Values returned from this function are merged with your `Config` object.

{% /table %}

For example, this is how you set the `mode` to `static` to pre-render the page at build time using the props returned by `getStaticProps`:

```js
module.exports = withMarkdoc({ mode: 'static' })({
  pageExtensions: ['js', 'md'],
});
```

## Schema customization

You can customize the Markdoc schema by creating a `/markdoc/` directory at the root of your project. This is where custom [nodes](/docs/nodes) and [tags](/docs/tags) are defined.

Files under `/markdoc/` are automatically imported and combined into your Markdoc schema. If you want to specify which files are included, create a `/markdoc/index.js` file and define the schema exports.

You can choose the import location for your schema by passing the `schemaPath` option to `withMarkdoc`:

```js
module.exports = withMarkdoc({ schemaPath: './path/to/your/markdoc/schema' })({
  pageExtensions: ['js', 'md'],
});
```

### Nodes

Custom nodes are registed by exporting a registration obect from a file within the `/markdoc` directory. In this example, we're using [`next/link`](https://nextjs.org/docs/api-reference/next/link) instead of the standard `Link` component:

```js
import { Link } from 'next/link';

export const link = {
  node: 'link',
  Component: Link,
  attributes: {
    href: {
      type: String,
    },
  },
};
```

### Tags

Custom tags are registed by exporting a registration obect from a file within the `/markdoc` directory. In this example, the tag name is `button`, which matches the name of the exported object. The `Component` mapping tells Markdoc to render a `Button` React component whenever the `{% button %}` tag is used.

```js
// markdoc/Button.markdoc.js

import { Button } from '../components/Button';

export const button = {
  Component: Button,
  attributes: {
    href: {
      type: String,
    },
  },
};
```

If you want to specify a tag name, set the `tag` key.

```js
// markdoc/SpecialButton.markdoc.js

export const button = {
  tag: 'special-button'
  Component: SpecialButton,
  attributes: {},
};
```

## Frontmatter

Markdoc is frontmatter agnostic, however, `next-markdoc` uses YAML as its default frontmatter language. You can access the frontmatter object within your `_app.js` under `pageProps.markdoc.frontmatter`, or in your content with the `$markdoc.frontmatter` variable.

For example:

{% markdoc-example %}

```md
---
title: Using the Next.js plugin
description: Integrate Markdoc into your Next.js app
---

# {% $markdoc.frontmatter.title %}
```

{% /markdoc-example %}

## Layouts

To create a custom layout for each of your Markdown/Markdoc files, simply wrap your `Component` within your `_app.js`, for example:

```js
// pages/_app.js

import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout frontmatter={pageProps.markdoc.frontmatter}>
      <Component {...pageProps} />
    </Layout>
  );
}
```

## Built-in Next.js tags

Earlier in this guide, we discussed customizing nodes and tags. It's also important to call out that the Next.js plugin provides custom components out of the box, and each of these components accessible via tags that you can add to your schema. **TODO: Mike we need to clean this up.**

```js
// markdoc/Next.markdoc.js

export {
  comment,
  head,
  image,
  link,
  script,
  markdocExample,
} from '@stripe-internal/next-markdoc/tags';
```

After you've exported the components, you can use them with the corresponding tags in your Markdoc files. Here is how each of these Next.js components are used.

### Comment

Renders nothing. Use this to document the content within a Markdoc file.

{% markdoc-example %}

```md
{% comment %}
Your comment goes here
{% /comment %}
```

{% /markdoc-example %}

### Head

Renders a [Next.js `Head` component](https://nextjs.org/docs/api-reference/next/head). You can use this to add stuff to the `<head>` of your page.

{% markdoc-example %}

```md
{% head %}
<add custom title and meta components here>
{% /head %}
```

{% /markdoc-example %}

### Image

Renders a [Next.js `Image` component](https://nextjs.org/docs/api-reference/next/image). Requires passing `src`, `alt`, `width` and `height` attributes.

{% markdoc-example %}

```md
{% image
   src="/logo.svg"
   alt="My logo"
   width=50
   height=50 /%}
```

{% /markdoc-example %}

### Link

Renders a [Next.js `Link` component](https://nextjs.org/docs/api-reference/next/link). Requires passing an `href` attribute.

{% markdoc-example %}

```md
{% link href="/docs/getting-started" %}
Getting started
{% /link %}
```

{% /markdoc-example %}

### Script

Renders a [Next.js `Script` component](https://nextjs.org/docs/api-reference/next/script). Requires passing a `src` attribute.

{% markdoc-example %}

```md
{% script src="https://js.stripe.com/v3" /%}
```

{% /markdoc-example %}

### Markdoc example

Use the `markdoc-example` tag to document Markdoc components themselves.

{% markdoc-example %}

````md
{% markdoc-example %}

```md
{% comment %}
<Markdoc stuff goes here>
{% /comment%}
```

{% /markdoc-example %}
````

{% /markdoc-example %}
