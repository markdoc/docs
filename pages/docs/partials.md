---
title: Partials
description:
---

# {% $markdoc.frontmatter.title %}

Partials are used to reuse content across documents. The content is stored in a separate Markdoc file, and referenced from within the partial tag.

Here is an example of including the `/partials/header.md` file as a partial.
{% markdoc-example %}

```
{% partial file="header.md" /%}
```

{% /markdoc-example %}

#### Registering partials

Partials are defined by created a mapping from file name to an AST node in your [`Config` object](/docs/config). The default `partial` [tag](/docs/tags) will look at this config in order to include the right content.

{% markdoc-example %}

```js
const config = {
  partials: {
    '/partials/header.md': Markdoc.parse(`# My header`)
  }
};

const doc = `
{% partial file="header.md" /%}
`;

const ast = Markdoc.parse(doc);

return Markdoc.process(ast, config);
```

{% /markdoc-example %}

If you want the `partial` tag to behave differently, you can just override it in `Config.tags`.

#### Passing variables

Partials are just like other tags, so you can pass [variables](/docs/variables) as [attributes](/docs/attributes) to them like:

{% markdoc-example %}

```
{% partial file="header.md" variables={name: "My header name"} /%}
```

{% /markdoc-example %}

and access the variables just like in a regular Markdoc document:

{% markdoc-example %}

```
{% $name %}
```

{% /markdoc-example %}
