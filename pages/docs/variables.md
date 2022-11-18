---
title: Variables
description: Variables let you transform and customize your document at runtime.
---

# {% $markdoc.frontmatter.title %}

Variables let you customize your Markdoc documents at runtime.

{% markdoc-example %}

```
Here I am rendering a custom {% $variable %}
```

{% /markdoc-example %}

You can pass variables in a few ways:

1. Through the `variables` field on your [`config` object](/docs/config)
2. Via the [`variables` attribute](#with-partials) on a [`partial` tag](/docs/partials).
3. Manually from within your [`Node`](/docs/nodes) or [`Tag`](/docs/tags) `transform` functions.

## Global variables

Here's an example of how you can pass variables to your config:

{% markdoc-example %}

```js
const doc = `
{% if $flags.my_feature_flag %}
Username: {% $user.name %}
{% /if %}
`;

const config = {
  variables: {
    flags: {
      my_feature_flag: true
    },
    user: {
      name: 'Dr. Mark'
    }
  }
};

const ast = Markdoc.parse(doc);
const content = Markdoc.transform(ast, config);
```

{% /markdoc-example %}

which you can then access within your document:

{% markdoc-example %}

```
{% if $flags.my_feature_flag %}
Username: {% $user.name %}
{% /if %}
```

{% /markdoc-example %}

## With partials

To pass variables to a partial, set the `variables` attribute:

{% markdoc-example %}

```
{% partial variables={sdk: "Ruby", version: 3} file="header.md" /%}
```

{% /markdoc-example %}

and access the value within your partial file the same way you would a regular variable:

{% markdoc-example %}

```
SDK: {% $sdk %}
Version: {% $version %}
```

{% /markdoc-example %}

## Caveats

Markdoc doesn't support passing variables to certain [nodes](/docs/nodes), such as the `href` of a `link` Node. Instead, pass your variable to the `href` [attribute](/docs/attributes) of a custom `link` [Tag](/docs/tags).

{% side-by-side %}

{% item %}

#### Incorrect

{% markdoc-example %}

```
[Link]({% $variable %})
```

{% /markdoc-example %}

{% /item %}

{% item %}

#### Correct

{% markdoc-example %}

```
{% link href=$variable %}Link{% /link %}
```

{% /markdoc-example %}

{% /item %}

{% /side-by-side %}

## Next steps

- [Validate your content](/docs/validation)
- [Render as HTML or React](/docs/render)
