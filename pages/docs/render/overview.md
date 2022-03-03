---
title: Phases of rendering
description:
---

# {% $markdoc.frontmatter.title %}

Markdoc has 3 phases of rendering: `parse`, `process`, and `render`. Each phase operates on the output of the previous phases.

Markdoc also includes a `validate` function, which you can run separately from the render phases to confirm the Markdoc document is valid.

## Parse

```js
parse(string) => AstNode
```

Parse transforms a raw string into an [abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) representing your Markdoc document. The AST contains information about your content, including where each piece of content exists within the document.

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

Check this out for yourself in the [developer playground](/sandbox?mode=ast).

AST node instances also include helpful functions, like `walk`, which can be useful for traversing and mutating your AST.

```js
const ast = Markdoc.parse(document);

for (const node of document.walk()) {
  // do something with each node
}
```

## Process

```js
process(string | AstNode | AstNode[], ?Config) => RenderTreeNode | RenderTreeNode[]
```

Process takes an abstract syntax tree and transforms it into a render tree, a serializable intermediate representation of what will eventually be rendered. This object is useful for computing things like a [table-of-contents](/docs/examples#table-of-contents), or passing over the wire to your client.

The process step is also responsible for resolving variables into static, scalar values (string, boolean, object, etc.).

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

You can see a more complex render tree in the [developer playground](/sandbox?mode=process).

## Render

```js
render(
  string | AstNode | RenderTreeNode | RenderTreeNode[],
  ?Config,
  'html' | 'react' | 'reactStatic' = 'html'
) => mixed
```

Render takes in a render-tree and transforms it into rendered output. For `html`, that means creating an HTMl document as a string. For `react`, this means creating a [React element](https://reactjs.org/docs/rendering-elements.html).

You can create your own renderer by creating a function that takes in a render tree as parameter and returns your desired output.

An example `html` output might look like this:

```html
<h1>Getting started</h1>

<p>Run this command to install the Markdoc library:</p>
```

## Validate

```js
validate(string | AstNode, ?Config) => ValidateError[]
```

This in an optional step that you can use to validate your AST before rendering. This is useful during testing, continuous integration, or in dev-tools like editor extensions.

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
