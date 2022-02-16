---
title: Nodes
description:
---

# {% $markdoc.frontmatter.title %}

Nodes are elements that Markdoc inherits from the Markdown, specifically the [CommonMark specification](https://commonmark.org/).

## Supported nodes

{% table %}

- Node type
- Description
- Markdown example

---

- document

---
* heading
* Heading and sub-headings for a section start with `#`.
* ```
  # This is an H1

  ## This is an H2

  ### This is an H3
  ```

---
* paragraph
* Consecutive lines of text. Separate paragraphs with a blank line. 
* ```
  This is an example of a paragraph.

  This is another paragraph.
  ```

---
* blockquote
* Indented text. 
* ```
  > This is a block quote.
  >
  > This is a continuation of the block quote on a new line.
  ```

---

- hr
- Horizontal rules.
- ```
  ---
  ```

---
* image
* Images are added with `!`. 
* ```
  ![Image description](/path/to/image.png)
  ```
---
* fence
* 
* 
---
* tag
* 
* 
  {% markdoc-example %}
  ```
  {% tag-name %}
  {% /tag-name %}
  ```
  {% /markdoc-example %}

---

- list
- Ordered and unordered lists.
- ```
  1. Apple
  2. Pear
  3. Mango
  ```
  ```
  * Dog
    * Corgi
  * Cat
    * Minx
  * Bird
    * Parrot
  ```

---
* item
* 
* 
---
* table
* Table
* 
  ```
  | Heading 1 | Heading 2 |
  |-----------|-----------|
  | Data A    | Data B    |
  | Data C    | Data D    |
  ```
---
* thead
* Table header.
* 
---
* body
* 
* 
---
* tr
* Table row.
* 
---
* td
* Table data.
* 
---
* th
* Table header.
* 
---
* inline
* 
* 
---
* strong
* Bold text with `**`.
* 
  ```
  **Bold text**
  ```
---
* em
* Italicized text with `_` or `*`.
* 
  ```
  _Italic text_
  ```
  ```
  *More italic text*
  ```
---
* link
* 
* 
  ```
  [Link text](/path/to/location)
  ```
---
* code
* Code blocks.
* ````
  ```
  import math

  x = math.sqrt(64)
  print(x)
  ```
  ````
---
* text
* 
* 
---

{% /table %}
