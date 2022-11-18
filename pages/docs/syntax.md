---
title: The Markdoc syntax
---

# {% $markdoc.frontmatter.title %}

Markdoc syntax is a superset of Markdown, specifically the [CommonMark specification](https://commonmark.org/). Markdoc adds a few extensions to the syntax, such as tags and annotations, which we describe below. These extensions enable Markdoc's powerful extensibility model.

For a formal grammar of the Markdoc tag syntax, refer to the [Markdoc syntax spec](/spec).

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

\
For more information, check out the [Tags docs](/docs/tags).

## Attributes

Pass attributes to nodes and tags to customize their behavior. You can pass values of type: `number`, `string`, `boolean`, JSON `array`, or JSON `object`, either directly or using [variables](#variables). 

With tags, you can use an HTML-like syntax:

{% markdoc-example %}

```
{% city
   index=0
   name="San Francisco"
   deleted=false
   coordinates=[1, 4, 9]
   meta={id: "id_123"} 
   color=$color /%}
```

{% /markdoc-example %}

Because the HTML-like syntax doesn't work with nodes, we offer another option: write the attributes after the tag or node you're passing them to, in a separate set of `{%` and `%}`. 

{% markdoc-example %}

```
{% table %}

- Function {% width="25%" %}
- Returns  {% colspan=2 %}
- Example  {% align="right" %}

{% /table %}
```

{% /markdoc-example %}

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

## Comments

{% callout type="warning" %}
Note: comment support currently requires passing `allowComments: true` to `Markdoc.Tokenizer`.  
This will be on by default in a future version of Markdoc.
{% /callout%}

Markdoc supports [Markdown comment syntax](https://spec.commonmark.org/0.30/#example-624) adding comments to your documents without having the content show up in the renderable output.

{% markdoc-example %}

```
<!-- comment goes here -->
```

{% /markdoc-example %}

## Next steps

- [Render Markdoc](/docs/render)
- [Validate your content](/docs/validation)