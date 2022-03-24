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

There are two ways to pass variables: 1) through the `variables` field on your [`Config`](/docs/config), and 2) via the `variables` [attribute](/docs/syntax#attributes) on a [`partial` tag](/docs/tags#partials).

## Global variables

Here is an example of how you can pass variables to your config:

{% markdoc-example %}

```js
const config = {
  variables: {
    flags: {
      my_feature_flag: true,
    },
    user: {
      name: 'Dr. Mark',
    },
  },
};

const content = Markdoc.process(document, config);
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
{% partial variables={sdk: "Ruby", version: 3} file="my_partial.md" /%}
```

{% /markdoc-example %}

and access the value within your partial file the same way you would a regular variable:

{% markdoc-example %}

```
SDK: {% $sdk %}
Version: {% $version %}
```

{% /markdoc-example %}
