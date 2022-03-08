---
title: Variables
description: Variables let you transform and customize your document at runtime.
---

# {% $markdoc.frontmatter.title %}

{% comment %}
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
{% /comment %}