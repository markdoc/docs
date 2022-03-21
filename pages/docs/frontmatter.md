---
title: Frontmatter
description:
---

# {% $markdoc.frontmatter.title %}

With Markdoc, you can use frontmatter to apply metadata to your documents. Markdoc isn't opinionated when it comes to frontmatter, so you can use YAML, TOML, JSON, GraphQL—pretty much any data format you want.

## Examples

```yaml
---
title: Authoring in Markdoc
description: Quickly author amazing content with Markdoc systax, a superset of Markdown.
date: 2022-04-01
---
```


```toml
+++
title = "Authoring in Markdoc"
description = "Quickly author amazing content with Markdoc systax, a superset of Markdown."
date = "2022-04-01"
+++
```

```json
{
  "title": "Authoring in Markdown",
  "description": "uickly author amazing content with Markdoc systax, a superset of Markdown.",
  "date": "2022-04-01"
}
```

```graphql
{
  page {
    title
    description
    date
  }
}
```

## Access to frontmatter attributes

