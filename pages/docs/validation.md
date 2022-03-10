---
title: Validation
description: Extend Markdoc to provide custom validation for your documents.
---

# {% $markdoc.frontmatter.title %}

## Syntax validation

Markdoc supports syntax validation out of the box using the `validate` function.

```js
validate(string | AstNode, ?Config) => ValidateError[]
```

\
Calling `validate` is in an optional step that you can use to validate your AST before rendering. This is useful during testing, continuous integration, or in dev-tools like editor extensions.

{% markdoc-example %}

```js
const document = `# Heading`;

const ast = Markdoc.parse(document);

const errors = Markdoc.validate(ast, config);

// Do something with the errors
```

{% /markdoc-example %}

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

## Custom validation

You can also extend Markdoc with custom validation rules, by adding a `validate` function to [Node](/docs/nodes) or [Tag](/docs/tags) definitions, or to your custom attribute types.

### Validating content

Use `Node` or `Tag` `validate` functions to verify the contents are correct, particularly the `children`.

{% markdoc-example %}

```js
const config = {
  tags: {
    provider: {
      tag: 'provider',
      // ...
      validate(node) {
        if (node.children.length !== 1) {
          return [
            {
              id: 'provider-children',
              level: 'critical',
              message: 'Providers must only have one child.',
            },
          ];
        }
        return [];
      },
    },
  },
};
```

{% /markdoc-example %}

### Validating attributes

Use custom `Attribute` types to validate that the attributes passed to your tags and nodes are correct.

{% markdoc-example %}

```js
export class ImageSrc {
  validate(value: any, config: Config) {
    if (!value.startsWith('https://')) {
      return [
        {
          id: 'image-src',
          level: 'error',
          message: 'All image srcs should contain fully qualified URLs.',
        },
      ];
    }
    return [];
  }
}

const config = {
  image: {
    tag: 'img',
    attributes: {
      src: {
        type: ImageSrc,
        required: true,
        // ...
      },
      // ...
    },
  },
};
```

{% /markdoc-example %}
