---
title: What is Markdoc?
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites. Stripe created Markdoc to power [our public docs](http://stripe.com/docs).

## Frequently asked questions

#### Why use Markdoc over Markdown?

Markdoc is a superset of [CommonMark Markdown](https://commonmark.org/), so all Markdown syntax works in Markdoc. However, Markdoc has a powerful extensibility model, letting you customize how all the Markdown [nodes](/docs/nodes) render and add your own custom tags. This enables writers to create [rich documentation experiences](https://stripe.com/docs/checkout/quickstart) while using a familiar syntax.

#### What is the difference between Markdoc and MDX?

MDX allows embedding JavaScript inside of Markdown (think: docs as code). Markdoc has a strict separation between content and code (think: docs as data).

Markdoc uses a fully declarative approach to composition and flow control, where MDX relies on JavaScript/React. This means MDX docs can quickly become as complex as regular code which can lead to maintainability complications or a more difficult authoring environment.

Finally, MDX treats React components as separate blocks in the AST that need to be processed separately. By comparison, Markdoc includes a first-class, declarative tag syntax, making it simpler to handle content transforms, static analysis, and validation in a unified, lightweight manner. MDX requires using a separate transpiler, like Babel, to handle the separate processing, where Markdoc provides the complete toolchain for working with Markdoc documents.

{% side-by-side %}

{% item %}

#### MDX

```js
import {Box, Heading} from './components'

MDX using imported components!

<Box>
  <Heading>The current year is {year}</Heading>
<Box>
```

{% /item %}

{% item %}

#### Markdoc

{% markdoc-example %}

```md
No imports required.

{% box %}

# The current year is {% $year %}

{% /box %}
```

{% /markdoc-example %}

{% /item %}

{% /side-by-side %}

## Next steps

- [Install Markdoc](/docs/getting-started)
- [Try it out online](/sandbox)
