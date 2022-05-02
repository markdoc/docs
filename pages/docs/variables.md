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

There are two ways to pass variables:

1. Through the `variables` field on your [`Config`](/docs/syntax#config)
2. Via the `variables` [attribute](/docs/syntax#attributes) on a [`partial` tag](/docs/partials).

## Global variables

Here is an example of how you can pass variables to your config:

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

which can then be accessed within your document:

{% markdoc-example %}

```
{% if $flags.my_feature_flag %}
Username: {% $user.name %}
{% /if %}
```

{% /markdoc-example %}

## With partials

To pass variables to a partial, just set the `variables` attribute:

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

## Next steps

- [Validate your content](/docs/validation)
- [Render as HTML or React](/docs/render)
