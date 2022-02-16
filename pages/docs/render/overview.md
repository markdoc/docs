---
title: Phases of rendering
description:
---

# {% $markdoc.frontmatter.title %}

{% comment %}
TODO: `expand` will be removed
{% /comment%}
Markdoc has 4 phases of rendering: `parse`, `process`, `expand`, and `render`. Each phase operates on the output of the previous phases.

## Parse

```js
parse(string) => AstNode
```

Parse transforms a raw string into an abstract syntax tree (AST) representing your Markdoc document. The AST contains information about your content, including where each piece of content exists in the document.

An example AST might look like this:

```js
{
  "type": "document",
  "attributes": {},
  "children": [
    {
      "type": "paragraph",
        "attributes": {},
        "children": [...],
        "lines": [0, 2],
        "location": {
          "start": {
            "line": 0
          },
          "end": {
            "line": 2
          }
        },
        "errors": [],
        "inline": false,
    }
  ],
  "lines": [],
  "errors": [],
  "inline": false
}
```

Check this out for yourself in the [developer playground](/sandbox).

## Process

```js
process(string | Node | Node[], ?Config) => RenderTag | RenderTag[]
```

Process takes an abstract syntax tree and transforms it into a render tree, a serializable intermediate representation of your what will eventually be rendered. This object is useful fro computing things like a [table-of-contents](/docs/examples#table-of-contents) or TK.

An example render tree might look like this:

```js
[
  {
    name: 'h1',
    attributes: { id: 'Header' },
    children: ['Header'],
    inline: false,
  },
  {
    name: 'p',
    attributes: {},
    children: ['This is a paragraph'],
    inline: false,
  },
];
```

## Expand

```js
expand(string | Node | Node[], ?Config) => RenderTreeNode | RenderTreeNode[]
```

Expand takes an abstract syntax tree and transforms it into a render tree, a serializable intermediate representation of your what will eventually be rendered. This object is useful fro computing things like a [table-of-contents](/docs/examples#table-of-contents) or TK.

```js
{
  type: 'tag',
  name: 'example',
  children: ['example'],
  attributes: [
    { type: 'attribute', name: 'foo', value: 'bar' },
    { type: 'attribute', name: 'baz', value: 'test' },
  ],
}
```

## Render

```js
render(
  string | Node | RenderTreeNode | RenderTreeNode[],
  ?Config,
  'html' | 'react' | 'reactStatic' = 'html'
) => mixed
```

Render takes in a render-tree and transforms it into a renderable form. For `html`, that means creating an HTMl document as a string. For `react`, this means creating a [React element object](https://reactjs.org/docs/rendering-elements.html).

You can create your own renderer by just creating a function that takes in a render tree as parameter and returns your desired output.

And example HTML output might look like this:

```html
<h1>Getting started</h1>

<p>Run this command to install the Markdoc library:</p>
```

## Validate

This in an optional step that you can use to validate your AST before rendering. This is useful during testing, continuous integration, or in dev-tools like editor extensions.

```js
validate(string | Node, ?Options) => ValidateError[]
```

If your document contains a syntax error, the output of `validate` might look like this:

```js
[
  {
    type: 'error',
    lines: [0, 1],
    location: {
      start: {
        line: 0,
      },
      end: {
        line: 1,
      },
    },
    error: {
      id: 'parse-error',
      level: 'critical',
      message: 'Expected "\\"", "}", identifier, or whitespace but "," found.',
      location: {
        start: {
          offset: 12,
        },
        end: {
          offset: 13,
        },
      },
    },
  },
];
```
