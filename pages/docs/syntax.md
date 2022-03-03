---
title: The Markdoc syntax
---

# {% $markdoc.frontmatter.title %}

## Annotations

## Attributes

## Nodes

Nodes are elements that Markdoc inherits from Markdown, specifically the [CommonMark specification](https://commonmark.org/). \
See our [nodes documentation](/docs/nodes) for more details.

Node instances can be customized with [annotations](#annotations), as you can see above.

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

Tags can be customized with [variables](#variables), as you can see below.

## Variables

Markdoc variables let you customize your Markdoc documents at runtime. Variables are all prefixed with a "$".

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
