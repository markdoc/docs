---
title: The Markdoc syntax
---

# {% $markdoc.frontmatter.title %}

The Markdoc syntax is a superset of Markdown, specifically the [CommonMark specification](https://commonmark.org/). Markdoc adds a few key extensions to the syntax, which are outlined below.

## Nodes

Nodes are elements that Markdoc inherits from Markdown. See our [node documentation](/docs/nodes) for more details.

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

> Block quotes

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

```
Code fences
```

{% /side-by-side %}

Nodes can be customized with [annotations](#annotations), as you can see below.

## Tags

Tags are the main syntactic extension that Markdoc provides on top of Markdown. Tags consist of a tag name surrounded by `{%` and `%}`, followed by the content body, followed by a similar closing brace.

{% markdoc-example %}

```
{% tag %}
Content
{% /tag %}
```

{% /markdoc-example %}

Tags can also be self-closing (similar to HTML), which just involves removing the content body and adding a slash.

{% markdoc-example %}

```
{% image width=40 /%}
```

{% /markdoc-example %}

Tags can be customized with [attributes](#attributes), as you can see below.

## Annotations

Annotations are used to customize how individuals nodes are rendered. They are useful for passing properties to your rendered output, such as for defining an `id`, `class`, or attribute on an HTML or React element.

To add an `id` to a node, simply use Markdoc's custom ID syntax:

{% markdoc-example %}

```
# Header {% #custom-id %}
```

{% /markdoc-example %}

Similarly, to set a `class`, you can use the class syntax:

{% markdoc-example %}

```
# Heading {% .custom-class-name-here %}
```

{% /markdoc-example %}

You can set various attributes on a node, such a `width` or `height`.

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

Attributes are passed to tags in order to customize their behavior. These values are then fed through to your tag's `render` function, which you can use to change how the tag renders.

You can pass `number`s, `string`s, `boolean`s, JSON `array`s, and JSON `object`s as attributes.

{% markdoc-example %}

```
{% city index=0 name="San Francisco" deleted=false coordinates=[1, 4, 9] meta={id: "id_123"} /%}
```

{% /markdoc-example %}

## Variables

Markdoc variables let you customize your Markdoc documents at runtime. Variables are all prefixed with a `$`.

{% markdoc-example %}

```
Here I am rendering a custom {% $variable %}
```

{% /markdoc-example %}

Variables needs to contain JSON-serializable content, such as strings, booleans, numbers, arrays, and JSON objects.\
Nested values can be accessed using dot-notation, similar to JavaScript:

{% markdoc-example %}

```
Here is my deeply nested variable {% $markdoc.frontmatter.title %}
```

{% /markdoc-example %}

Variables can be used throughout your document, as content itself:

{% markdoc-example %}

```
© {% $currentYear %}  Stripe
```

{% /markdoc-example %}

…as attributes on a tag:

{% markdoc-example %}

```

{% link href=$baseURL %} Home {% /link %}

```

{% /markdoc-example %}

…as parameter to a function:

{% markdoc-example %}

```
{% if includes($supportedCountries, "US") %}
Show content
{% /if %}
```

{% /markdoc-example %}

or within node annotations:

{% markdoc-example %}

```
{% table %}

- Option
- Type
- Description {% width=$descriptionWidth %}

{% /table %}
```

{% /markdoc-example %}

## Functions

Functions look similar to JavaScript functions, and can be called within the body of the document, inside an annotation, or within tag attributes.
Function parameters are comma-separated, and trailing commas are not supported in function calls.

{% markdoc-example %}

```
# {% titleCase($markdoc.frontmatter.title) %}

{% if equals(1, 2) %}
Show the password
{% /if %}

{% tag title=uppercase($key) /%}
```

{% /markdoc-example %}
