# Markdoc is a powerful, flexible, Markdown-based authoring system

Markdoc is a lightweight text markup language, built and used by [Stripe Docs](https://stripe.com/docs), that extends [Markdown](https://www.markdownguide.org/). Where possible, Markdoc reuses native Markdown syntax to keep the format simple, and as close to the [CommonMark](https://commonmark.org/) standard as possible. Markdoc’s extensions are designed to be both composable and minimally intrusive. 

{% table %}
* Extension
* Syntax
* Description
---
* Tag 
* `{% tagname %}`
* Tags create blocks of content, making it possible to incorporate custom user interfaces inside of a document. For more information, see tag reference.
---
* Annotation
* `# Heading {% #anchor-id %}`
* Annotations are used to apply HTML attributes to a Markdown element. This is commonly used for named anchors.
---
* Variables 
* `{% $variablename %}`
* Description something then link to variables.
{% /table %}

## Renderers 

## Extend with React components

## Demo

