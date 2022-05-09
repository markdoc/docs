---
title: The Markdoc syntax
---

# {% $markdoc.frontmatter.title %}

Markdoc syntax is a superset of Markdown, specifically the [CommonMark specification](https://commonmark.org/). Markdoc adds a few extensions to the syntax, such as tags and annotations, which we describe below. These extensions enable Markdoc's powerful extensibility model.

## Nodes

Nodes are elements that Markdoc inherits from Markdown, which you can customize with [annotations](#annotations).

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

> Quotes

`Inline code`

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

`Inline code`

```
Code fences
```

{% /side-by-side %}

\
For more information, check out the [Nodes docs](/docs/nodes).

## Tags

Tags are the main syntactic extension that Markdoc adds on top of Markdown. Each tag is enclosed with `{%` and `%}`, and includes the tag name, [attributes](#attributes), and the content body.

Similar to HTML, you can nest Markdoc tags, and customize them with [attributes](#attributes).

{% markdoc-example %}

```
{% tag %}
Content
{% /tag %}
```

{% /markdoc-example %}

Tags can be self-closing (similar to HTML). In this example, you'll see that the content body is removed, and that the tag is closed with a `/`.

{% markdoc-example %}

```
{% image width=40 /%}
```

{% /markdoc-example %}

If your tag doesn't contain any new lines, then it's treated as an inline tag. Inline tags are automatically wrapped with a single `paragraph` [Node](/docs/nodes) (which renders a `<p>` element by default), to follow the [CommonMark paragraph spec](https://spec.commonmark.org/0.30/#paragraphs).

{% markdoc-example %}

```
{% code %}

{% highlight %}Inline tag 1{% /highlight %}
{% highlight %}Inline tag 2{% /highlight %}

{% /code %}
```

{% /markdoc-example %}

\
For more information, check out the [Tags docs](/docs/tags).

## Annotations

Customize how individual nodes are rendered with annotations. Annotations are useful when passing properties to customize the output, such as an `id` or `class`. You can also use annotations to apply [attributes](#attributes) to HTML and React elements.

You can access annotation values as [attributes](/docs/attributes) within your schema [`transform`](/docs/nodes#customizing-markdoc-nodes) functions.

\
To add an `id`, you can use this syntax:

{% markdoc-example %}

```
# Header {% #custom-id %}
```

{% /markdoc-example %}

To set a `class`, use class syntax:

{% markdoc-example %}

```
# Heading {% .custom-class-name-here %}
```

{% /markdoc-example %}

which also works within your tags.

{% markdoc-example %}

```md
{% section #id .class %}

My section

{% /section  %}
```

{% /markdoc-example %}

You can also set [attributes](#attributes) on a node, such as `width` or `colspan`.

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

Pass attributes to tags to customize their behavior. You can pass values of type: `number`, `string`, `boolean`, JSON `array`, or JSON `object`.

{% markdoc-example %}

```
{% city
   index=0
   name="San Francisco"
   deleted=false
   coordinates=[1, 4, 9]
   meta={id: "id_123"} /%}
```

{% /markdoc-example %}

All Markdoc strings use double-quotes. This includes when passing a string as an attribute or as a [function](#functions) parameter.  
If you want to include a double-quote in a string you can escape it with using `\"`.

\
For more information, check out the [Attributes docs](/docs/attributes).

## Variables

Markdoc variables let you customize your Markdoc documents at runtime. Variables all have a `$` prefix.

{% markdoc-example %}

```
Here I am rendering a custom {% $variable %}
```

{% /markdoc-example %}

Variables must contain JSON-serializable content, such as strings, booleans, numbers, arrays, and JSON objects.\
You can access nested values using dot-notation, similar to JavaScript:

{% markdoc-example %}

```
Here's a deeply nested variable {% $markdoc.frontmatter.title %}
```

{% /markdoc-example %}

You can use variables throughout your document, as content itself:

{% markdoc-example %}

```
© {% $currentYear %} Stripe
```

{% /markdoc-example %}

\
For more information, check out the [Variables docs](/docs/variables).

## Functions

Functions look and feel similar to JavaScript functions. They're callable from the body of the document, inside an annotation, or within tag attributes.
Function parameters are comma-separated. Trailing commas aren't supported in function calls.

{% markdoc-example %}

```
# {% titleCase($markdoc.frontmatter.title) %}

{% if equals(1, 2) %}
Show the password
{% /if %}

{% tag title=uppercase($key) /%}
```

{% /markdoc-example %}

\
For more information, check out the [Functions docs](/docs/functions).

## Config

This table outlines the various options you can pass to `Markdoc.transform`. Each option adjusts how a document is [transformed](/docs/render#transform) and [rendered](/docs/render#render).

{% table %}

- Key
- Type
- Description

---

- [`nodes`](/docs/nodes)
- {% code %}{ [nodeType: [NodeType](/docs/nodes#built-in-nodes)]: [Schema](https://github.com/markdoc/markdoc/blob/6bcb8a0c48a181ca9df577534d841280646cea09/src/types.ts#L94-L101) }{% /code%}
- Register [custom nodes](/docs/nodes) in your schema

---

- [`tags`](/docs/tags)
- {% code %}{ [tagName: string]: [Schema](https://github.com/markdoc/markdoc/blob/6bcb8a0c48a181ca9df577534d841280646cea09/src/types.ts#L94-L101) }{% /code%}
- Register [custom tags](/docs/tags) in your schema

---

- [`variables`](/docs/variables)
- `{ [variableName: string]: any }`
- Register [variables](/docs/variables) to use in your document

---

- [`functions`](/docs/functions)
- {% code %}{ [functionName: string]: [ConfigFunction](https://github.com/markdoc/markdoc/blob/6bcb8a0c48a181ca9df577534d841280646cea09/src/types.ts#L31-L36) }{% /code %}
- Register [custom functions](/docs/functions) to use in your document

---

- [`partials`](/docs/partials)
- `{ [partialPath: string]: Ast.Node }`
- Register reusable pieces of content to used by the [`partial` tag](/docs/partials)

{% /table %}

### Full example

Here's an example of what a Markdoc config would look like:

```js
const config = {
  nodes: {
    heading: {
      render: 'Heading',
      attributes: {
        id: { type: String },
        level: { type: Number }
      }
    }
  },
  tags: {
    callout: {
      render: 'Callout',
      attributes: {
        title: {
          type: String,
          description: 'The title displayed at the top of the callout'
        }
      }
    }
  },
  variables: {
    name: 'Dr. Mark',
    frontmatter: {
      title: 'Configuration options'
    }
  },
  functions: {
    includes: {
      transform(parameters, config) {
        const [array, value] = Object.values(parameters);

        return Array.isArray(array) ? array.includes(value) : false;
      }
    }
  },
  partials: {
    'header.md': Markdoc.parse(`# My header`)
  }
};

const content = Markdoc.transform(ast, config);
```

## Next steps

- [Render Markdoc](/docs/render)
- [Validate your content](/docs/validation)
