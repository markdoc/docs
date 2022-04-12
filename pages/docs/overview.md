---
title: What is Markdoc?
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites. Stripe created Markdoc to power [our public docs](http://stripe.com/docs), replacing [ERB](https://docs.ruby-lang.org/en/2.3.0/ERB.html).

## Frequently asked questions

#### What is the difference between Markdoc and MDX?

Markdoc uses a fully declarative approach to composition and flow control. MDX relies on JavaScript/React for flow control, where Markdoc uses a declarative approach.

In MDX, it’s possible to embed arbitrary JavaScript code in the content, which can quickly lead to maintainability complications.

The abstract syntax trees (ASTs) also differ between MDX and Markdoc. MDX treats React components as separate blocks in the AST that need to be processed/transpiled separately. By comparison, Markdoc includes a first-class, declarative tag syntax, making it simpler to handle content transforms, static analysis, and validation in a unified manner.

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
