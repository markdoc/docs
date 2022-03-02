---
title: The Markdoc syntax
---

# {% $markdoc.frontmatter.title %}

## Annotations

## Attributes

## Nodes

## Tags

## Variables

Markdoc variables let you customize your Markdoc documents at runtime. Variables are all prefixed with a "$" and need to contain JSON-serializable content.

{% markdoc-example %}

```markdoc
Here I am rendering a custom {% $variable %}
```

{% /markdoc-example %}

Variables can be used throughout your document, as content itself:

{% markdoc-example %}

```markdoc
© {% $currentYear %}  Stripe
```

{% /markdoc-example %}

…as attributes on a tag:

{% markdoc-example %}

```markdoc

{% link href=$baseURL %} Home {% /link %}

```

{% /markdoc-example %}

…as parameter to a function:

{% markdoc-example %}

```markdoc
{% if includes($supportedCountries, "US") %}
Show content
{% /if %}
```

{% /markdoc-example %}

or within node annotations:

{% markdoc-example %}

```markdoc
{% table %}

- Option
- Type
- Description {% width=$descriptionWidth %}

{% /table %}
```

{% /markdoc-example %}
