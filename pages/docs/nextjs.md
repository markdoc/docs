---
title: Using Markdoc with Next.js
description: Learn how to integrate Markdoc into a Next.js project.
---

# {% $markdoc.frontmatter.title %}

Using the `@markdoc/next.js` package/plugin allows you to create custom `.md` and `.mdoc` pages in your Next.js apps, and automatically render them with `markdoc`.

## Before you get started

This guide assumes that you already have a Next.js app. If you are starting from scratch, follow these steps for [getting started with Next.js](https://nextjs.org/docs).

## Setup

Follow these steps to get started with `@markdoc/next.js`.

1. Install `@markdoc/next.js`:
   ```bash
   npm install @markdoc/next.js
   ```
2. Update your `next.config.js`

   ```js
   const withMarkdoc = require('@markdoc/next.js');

   module.exports = withMarkdoc(/* options */)({
     pageExtensions: ['js', 'md']
   });
   ```

3. Create a new `.md` file in within `/pages/`, such as `getting-started.md`

   ```
   pages
   ├── _app.js
   ├── docs
   │   └── getting-started.md
   ├── index.js
   ```

4. Add some Markdoc to your file:

   ```
   ---
   title: Get started with Markdoc
   description: How to get started with Markdoc
   ---

   # Get started with Markdoc
   ```

## Options

You can pass options to `withMarkdoc` to adjust how the plugin behaves.

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
- An asynchronous function called at build time. Values returned from this function are merged with your [`Config` object](/docs/config).

{% /table %}

For example, this is how you set the `mode` to `static` to pre-render the page at build time using the props returned by `getStaticProps`:

```js
module.exports = withMarkdoc({ mode: 'static' })({
  pageExtensions: ['js', 'md']
});
```

## Schema customization

You can define your Markdoc schema by creating a `/markdoc/` directory at the root of your project. This is where custom [nodes](/docs/nodes) and [tags](/docs/tags) are defined.

All `.js` files under `/markdoc/` are automatically imported and combined to create your Markdoc schema. If you want to specify which files are included, create a `/markdoc/index.js` file and specify the schema exports.

You can choose the import location for your schema by passing the `schemaPath` option to `withMarkdoc`:

```js
module.exports = withMarkdoc({ schemaPath: './path/to/your/markdoc/schema' })({
  pageExtensions: ['js', 'md']
});
```

### Tags

Custom tags are registered by exporting a schema object from within the `/markdoc` directory. In this example, the tag name is `button`, the name of the exported object. The `Component` field tells Markdoc to render a `Button` React component whenever the `{% button %}` tag is used.

```js
// markdoc/Button.markdoc.js

import { Button } from '../components/Button';

export const button = {
  Component: Button,
  attributes: {
    href: {
      type: String
    }
  }
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

### Nodes

Custom node registrations are almost identical to [tags](#tags), but instead of setting the `tag` key, you set `node`, for example:

```js
import { Link } from 'next/link';

export const link = {
  node: 'link',
  Component: Link,
  attributes: {
    href: {
      type: String
    }
  }
};
```

This example overrides the default link node to use a [Next.js link](https://nextjs.org/docs/api-reference/next/link).

## Frontmatter

Markdoc is frontmatter agnostic, however, `@markdoc/next.js` uses YAML as its frontmatter language. You can access the frontmatter object within your `_app.js` under `pageProps.markdoc.frontmatter`, or in your content using the `$markdoc.frontmatter` variable.

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

Next.js Markdoc provides custom tags out-of-the-box that you can add to your schema. To include them, export them by name in your schema directory (e.g. `/markdoc/`). For example:

```js
// markdoc/Next.markdoc.js

export {
  comment,
  head,
  image,
  link,
  script,
  markdocExample
} from '@markdoc/next.js/tags';

// or

export * from '@markdoc/next.js/tags';
```

After you've exported the components, you can use them with the corresponding tags in your Markdoc files.

### Comment

Renders nothing, similar to code comments. Use this to document the content within a Markdoc file.

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

Use the `markdoc-example` tag to create code examples that contain Markdoc syntax.

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
