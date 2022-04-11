---
title: Frontmatter
description:
---

# {% $markdoc.frontmatter.title %}

With Markdoc, you can use frontmatter to apply metadata to your documents. Markdoc isn't opinionated when it comes to frontmatter, so you can use YAML, TOML, JSON, GraphQL—pretty much any data format you want.

## Examples

### YAML

```yaml
---
title: Authoring in Markdoc
description: Quickly author amazing content with Markdoc systax, a superset of Markdown.
date: 2022-04-01
---
```

### TOML

```toml
---
title       = "Authoring in Markdoc"
description = "Quickly author amazing content with Markdoc systax, a superset of Markdown."
date        = "2022-04-01"
---
```

### JSON

```json
---
{
  "title": "Authoring in Markdown",
  "description": "Quickly author amazing content with Markdoc systax, a superset of Markdown.",
  "date": "2022-04-01"
}
---
```

### GraphQL

```graphql
---
{
  page {
    title
    description
    date
  }
}
---
```

## Access frontmatter attributes

To access your frontmatter content within your document, you have to pass the values as [variables](/docs/variables), just as you would otherwise.

First, parse your document to get access to the frontmatter content

{% markdoc-example %}

```js
const doc = `
---
title: My title
---

# {% $frontmatter.title %} 
`;

const ast = Markdoc.parse(doc);
```

{% /markdoc-example %}

Then, parse the frontmatter attribute using your preferred format and pass it to your `variables` config.

```js
import yaml from 'js-yaml'; // or 'toml', etc.

const frontmatter = ast.attributes.frontmatter
  ? yaml.load(ast.attributes.frontmatter)
  : {};

const config = {
  variables: {
    frontmatter
  }
};
```

You can then access your frontmatter values from the `$frontmatter` variable

{% side-by-side %}

{% markdoc-example %}

```md
# {% $frontmatter.title %}
```

{% /markdoc-example %}

# {% $markdoc.frontmatter.title %}

{% /side-by-side %}
