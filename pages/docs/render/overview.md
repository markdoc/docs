---
title: Phases of rendering
description:
---

# {% $markdoc.frontmatter.title %}

{% comment %}
TODO: `expand` will be removed
{% /comment%}
Markdoc has 4 phases of rendering: `parse`, `process`, `expand`, and `render`. Each phase operates on the output of the previous phase.

## Parse

```js
parse(string | Token[]): Node
```

## Process

```js
process(string | Node | Node[], ?Config): RenderTag | RenderTag[]
```

## Expand

```js
expand(string | Node | Node[], ?Config): RenderTag | RenderTag[]
```

## Render

```js
render(
  string | Node | RenderTreeNode | RenderTreeNode[],
  ?Config,
  'html' | 'react' | 'reactStatic' = 'html'
): RenderTag | RenderTag[]
```

## Validate

This in an optional step that you can use to validate your AST before rendering. This is useful during testing, or in dev-tools like editor extensions.

```js
validate(string | Node, ?Options): ValidateError[]
```
