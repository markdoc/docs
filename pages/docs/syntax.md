---
title: The Markdoc syntax
---

# {% $markdoc.frontmatter.title %}

Markdoc syntax is a superset of Markdown, specifically the [CommonMark specification](https://commonmark.org/). Markdoc adds a few extensions to the syntax, such as tags and annotations, which are described below.

## Nodes

Nodes are elements that Markdoc inherits from Markdown, which can be customized with [annotations](#annotations).

{% side-by-side %}

{% markdoc-example %}

````
# Headers

**Bold**

_Italic_

[Links](/docs/nodes)

![Images](/logo.svg)

Lists
- Item 1
- Item 1
- Item 1

> Quotes

`Inline code`

```
Code fences
```
````

{% /markdoc-example %}

#### Headers

**Bold**

_Italic_

[Links](/docs/nodes)

Lists

- Item 1
- Item 1
- Item 1

> Quotes

`Inline code`

```
Code fences
```

{% /side-by-side %}

\
For more information, check out the [Nodes docs](/docs/nodes).

## Tags

Tags are the main syntactic extension that Markdoc adds on top of Markdown. Each tag is enclosed with `{%` and `%}`, and includes the tag name and content body. Tags are customizable with [attributes](#attributes).

{% markdoc-example %}

```
{% tag %}
Content
{% /tag %}
```

{% /markdoc-example %}

Tags can be self-closing (similar to HTML). In this example, you'll see that the content body is removed, and that the tag is closed with a `/`.
{% markdoc-example %}

```
{% image width=40 /%}
```

{% /markdoc-example %}

\
For more information, check out the [Tags docs](/docs/tags).

## Annotations

Customize how individual nodes are rendered with annotations. Annotations are useful when passing properties to a rendered output, such as an `id` or `class`. You can also use annotations to apply [attributes](#attributes) to HTML and React elements.

To add an `id` to a node:

{% markdoc-example %}

```
# Header {% #custom-id %}
```

{% /markdoc-example %}

To set a `class`, you can use class syntax:

{% markdoc-example %}

```
# Heading {% .custom-class-name-here %}
```

{% /markdoc-example %}

You can also set [attributes](#attributes) on a node, such a `width` or `height`.

{% markdoc-example %}

```
{% table %}

- Function {% width="25%" %}
- Returns  {% colspan=2 %}
- Example  {% align="right" %}

{% /table %}
```

{% /markdoc-example %}

## Attributes

Pass attributes to tags to customize their behavior. Accepted values include: `number`s, `string`s, `boolean`s, JSON `array`s, and JSON `object`s.

{% markdoc-example %}

```
{% city index=0 name="San Francisco" deleted=false coordinates=[1, 4, 9] meta={id: "id_123"} /%}
```

{% /markdoc-example %}

\
For more information, check out the [Attributes docs](/docs/attributes).

## Variables

Markdoc variables let you customize your Markdoc documents at runtime. Variables are all prefixed with `$`.

{% markdoc-example %}

```
Here I am rendering a custom {% $variable %}
```

{% /markdoc-example %}

Variables must contain JSON-serializable content, such as strings, booleans, numbers, arrays, and JSON objects.\
Nested values are accessible using dot-notation, similar to JavaScript:

{% markdoc-example %}

```
Here is my deeply nested variable {% $markdoc.frontmatter.title %}
```

{% /markdoc-example %}

Variables can be used throughout your document, as content itself:

{% markdoc-example %}

```
© {% $currentYear %} Stripe
```

{% /markdoc-example %}

\
For more information, check out the [Variables docs](/docs/variables).

## Functions

Functions look and feel similar to JavaScript functions. They are callable from body of the document, inside an annotation, or within tag attributes.
Function parameters are comma-separated. Trailing commas aren't supported in function calls.

{% markdoc-example %}

```
# {% titleCase($markdoc.frontmatter.title) %}

{% if equals(1, 2) %}
Show the password
{% /if %}

{% tag title=uppercase($key) /%}
```

{% /markdoc-example %}

\
For more information, check out the [Functions docs](/docs/functions).

## Next steps

- [Creating custom tags](/docs/tags)
- [Customizing how nodes render](/docs/nodes)
- [Passing variables](/docs/variables)
- [Defining new functions](/docs/functions)
