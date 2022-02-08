---
title: Using the Next.js plugin
description: Integrate Markdoc into your Next.js app
---

# {% $markdoc.frontmatter.title %}

The `@stripe-internal/next-markdoc` package allows you to create custom `.md` / `.mdoc` pages in your Next.js app, automatically rendering them using `@stripe-internal/markdoc`.

## Setup

Follow these steps to setup `@stripe-internal/next-markdoc` in Next.js:

##### 1. Install the plugin

```bash
npm install @stripe-internal/next-markdoc
```

##### 2. Add the plugin to your `next.config.js`

```js
// next.config.js

const withMarkdoc = require('@stripe-internal/next-markdoc');

module.exports = withMarkdoc(/* options */)({
  pageExtensions: ['js', 'md'],
});
```

##### 3. Create a new Markdoc page in the `/pages/` directory:

```
pages
├── _app.js
├── docs
│   └── getting-started.md
└── index.md
```

where `getting-started.md` might look like:

```md
---
title: Get started with Markdoc
description: How to get started with Markdoc
---

# Get started with Markdoc
```

## Options

You can pass a few options to `withMarkdoc` to customize how the plugin behaves:

{% table %}

- Option
- Type
- Description

---

- `schemaPath`
- `string`
- Path to your Markdoc schema folder. See [customization](#customization) below.

---

- `mode`
- `'static' | 'server'`
- Determines whether the generated Markdoc pages use [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) or [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props).

---

- `config`
- `Node => Promise<Object>`
- An asynchronous function that is called at build time. Values returned from this function will be merged with your `Config` object.

{% /table %}

## Customization

You can customize your Markdoc schema by creating a `/markdoc/` directory at the root of your project. This is where you will define your custom [nodes](/docs/nodes) and [tags](/docs/tags) and specify how they render.

All the the files under `/markdoc/` will be automatically imported and combined into your Markdoc schema. If you want to control which files get included in your schema, simply create a `/markdoc/index.js` file and define the schema exports yourself.

You can customize where this folder is imported from by passing a custom `schemaPath` to `withMarkdoc`:

```js
module.exports = withMarkdoc({schemaPath: './path/to/your/markdoc/schema'})({
  pageExtensions: ['js', 'md'],
});
```

### Tags

Custom tags are registered by exporting a registration object from a file within `/markdoc/`, for example:

```js
// markdoc/Button.markdoc.js

import {Button} from '../components/Button';

export const button = {
  Component: Button,
  attributes: {
    href: {
      type: String,
    },
  },
};
```

In this example, the tag name will be `button`, since that is the name of the exported object. The `Component` mapping tells Markdoc to render a `Button` React component whenever a `{% button %}` tag is used.

If you want to specify a different tag name, set the `tag` key.

```js
// markdoc/SpecialButton.markdoc.js

export const button = {
  tag: 'special-button'
  Component: SpecialButton,
  attributes: {},
};
```

### Nodes

Custom node registrations are almost identical to tags, but instead of setting the `tag` key, you would set `node`, for example:

```js
import {Link} from 'next/link';

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

## Frontmatter

Although Markdoc itself follows the idea of "Bring your own Frontmatter", the Next.js Markdoc plugin uses YAML as its frontmatter langauge of choice, making it easier to get started without parsing the frontmatter yourself.

You can then access the frontmatter object within your `_app.js` under `pageProps.markdoc.frontmatter`, or within your content via the `$markdoc.frontmatter` variable.

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

export default function App({Component, pageProps}) {
  return (
    <Layout frontmatter={pageProps.markdoc.frontmatter}>
      <Component {...pageProps} />
    </Layout>
  );
}
```

## Next.js tags

Next.js provides a bunch of custom components out of the box. For each of these, `@stripe-internal/next-markdoc` exports a corresponding tag that you can add to your schema.

To add these components to your schema, simply export from from a file in `/markdoc/`, like:

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

and use the corresponding tags in your Markdoc files.

#### `comment`

Renders nothing. Use this to document the content within a Markdoc file.

{% markdoc-example %}

```md
{% comment %}
Your comment goes here
{% /comment %}
```

{% /markdoc-example %}

#### `head`

Renders a [Next.js `Head` component](https://nextjs.org/docs/api-reference/next/head). You can use this to add stuff to the `<head>` of your page.

{% markdoc-example %}

```md
{% head %}
<add custom title and meta components here>
{% /head %}
```

{% /markdoc-example %}

#### `image`

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

#### `link`

Renders a [Next.js `Link` component](https://nextjs.org/docs/api-reference/next/link). Requires passing an `href` attribute.

{% markdoc-example %}

```md
{% link href="/docs/getting-started" %}
Getting started
{% /link %}
```

{% /markdoc-example %}

#### `script`

Renders a [Next.js `Script` component](https://nextjs.org/docs/api-reference/next/script). Requires passing a `src` attribute.

{% markdoc-example %}

```md
{% script src="https://js.stripe.com/v3" /%}
```

{% /markdoc-example %}

#### `markdoc-example`

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
