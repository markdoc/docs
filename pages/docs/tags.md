---
title: Tags
description: Tags are used to extend Markdown. With tags you can use native Markdoc components or custom-built React components.
---

# {% $markdoc.frontmatter.title %}

## Creating a custom tag

Tags are an syntactic extension of standard Markdown. With tags you can use native Markdoc components, like list tables, conditionals, and partials, or custom-built React components.

To extend Markdoc with your own custom tags, first create a custom tag definition:

```js
// ./schema/Callout.markdoc.js

export const callout = {
  tag: 'Callout',
  description: 'Display the enclosed content in a callout box',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['caution', 'check', 'note', 'warning'],
      errorLevel: 'critical',
      description:
        'Controls the color and icon of the callout. Can be: "caution", "check", "note", "warning"',
    },
    title: {
      type: String,
      description: 'The title displayed at the top of the callout',
    },
  },
};
```

Then, pass your tag definition to your `Config` object:

```js
import { callout } from './schema/Callout.markdoc';

const config = {
  tags: {
    callout,
  },
};

return Markdoc.render(content, config);
```

Then, pass your config to `Markdoc.render`. If you want to render a React component, specify which component should render this type of tag (in this case, `Callout`) within the `components` mapping.

```js
import * as React from 'react';
import { Icon } from './Icon';

function Callout({ title, icon, children }) {
  return (
    <div className="callout">
      <div className="content">
        <Icon icon={icon} />
        <div className="copy">
          <span className="title">{title}</span>
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}

return Markdoc.renderers.react(content, React, {
  components: {
    // The key here is the same string as `tag` in the previous step
    Callout: Callout,
  },
});
```

Finally, use your custom tag in your Markdoc content.

{% side-by-side %}

{% markdoc-example %}

```md
{% callout title="Hey you!" icon="note" %}
I have a message for you
{% /callout %}
```

{% /markdoc-example %}

{% callout title="Hey you!" type="note" %}
I have a message for you
{% /callout %}

{% /side-by-side %}

## Options

These are the fields you can use to customize your `Tag`

{% table %}

- Option
- Type
- Description {% width="40%" %}

---

- `tag`
- `string | Node => string`
- Name of the HTML tag or React component to render.

---

- `children`
- `string[]`
- Determines which tag or node types are allowed to be rendered as children of this tag. Used in schema validation.

---

- `attributes`
- `{ [string]: SchemaAttribute }`
- Determines which values (and their types) are allowed to be passed to this tag.

---

- `selfClosing`
- `boolean`
- Determines whether a tag can contain children (`false`) or not (`true`). Used in schema validation.

---

- `render`
- `(Node, ?Options) => RenderTag | RenderTag[] | null`
- Customize the Markdoc render function for this tag, returning the custom output you want to render. This is called during the [`process` step](/docs/render/overview#process).

---

- `validate`
- `(Node, ?Options) => ValidationError[];`
- Extend Markdoc validation. Used to validate that the content meets validation requirements. This is called during the [`validate` step](/docs/render/overview#validate)

{% /table %}

## Built-in tags

Markdoc comes out-of-the-box with 4 built-in functions: `if`, `else`, `table`, and `partial`.

### If/Else

Dynamically render content when specific conditions are met using the `{% if %}` and `{% else %}` tags. In Markdoc, conditionals are used with [variables](./variables) and [functions](./functions).

Use the `if` tag to render content when a condition evaluates to `true`.

{% markdoc-example %}

```
This is shown no matter what.

{% if $myFunVar %}
Only appear if $myFunVar!
{% /if %}
```

{% /markdoc-example %}

Use the `else` tag to render alternate content when the `if` condition isn't met. You can use multiple `else` statements, and the final `else` tag triggers when none of the other conditions are met.

{% markdoc-example %}

```
{% if $myFunVar %}
Only appear if $myFunVar!
{% else /%}
This appears if not $myFunVar!
{% /if %}

{% if $myFunVar %}
Only appear if $myFunVar!
{% else $otherFunVar /%}
This appears if not $myFunVar and $otherFunVar!
{% else /%}
This appears if not $myFunVar and not $otherFunVar
{% /if %}
```

{% /markdoc-example %}

### Tables

While GitHub Flavored Markdown (GFM) tables are supported, Markdoc also supports a list based syntax that allows for easy injection of rich content, like bulleted lists and code samples.

#### Basic table

A basic Markdoc table uses list syntax with each row separated by three dashes `---`.

{% markdoc-example %}

```
{% table %}
* Heading 1
* Heading 2
---
* Row 1 Cell 1
* Row 1 Cell 2
---
* Row 2 Cell 1
* Row 2 cell 2
{% /table %}
```

{% /markdoc-example %}

#### Table with rich content

Markdoc tables support rich text, including code samples and lists.

{% markdoc-example %}

````
{% table %}
* Foo
* Bar
* Baz
---
*
  ```
  puts "Some code here."
  ```
*
  {% list type="checkmark" %}
  * Bulleted list in table
  * Second item in bulleted list
  {% /list %}
* Text in a table
---
*
  A "loose" list with

  multiple line items
* Test 2
* Test 3
---
* Test 1
* A cell that spans two columns {% colspan=2 %}
{% /table %}
````

{% /markdoc-example %}

#### Table without headings

{% markdoc-example %}

```
{% table %}
---
* foo
* bar
---
* foo
* bar
{% /table %}
```

{% /markdoc-example %}

#### Set column and row span

Explicitly set column and row span.

{% markdoc-example %}

```
{% table %}
---
* foo
* bar
---
* foo {% colspan=2 %}
{% /table %}
```

{% /markdoc-example %}

#### Text alignment

{% markdoc-example %}

```
{% table %}
* Column 1 {% align="center" %}
* Column 2
* Column 3 {% align="right" %}
---
* foo
* bar
* baz
---
* foo
* bar {% align="right" %}
* baz
---
* foo {% align="center" %}
* bar
* baz
{% /table %}
```

{% /markdoc-example %}

### Partials

Partials are primarily used to reuse text or code examples across docs. The reusable information (text or code) is stored in a separate markdown file, and referenced from within the partial tag.

{% markdoc-example %}

```
This is an example of including the `/docs/header.md` file as a partial.

{% partial file="/partials/header.md" /%}
```

{% /markdoc-example %}

#### Passing variables

Partials are just like other tags, so you can pass variables to them like:

{% markdoc-example %}

```
{% partial file="/partials/header.md" variables={name: "My header name"} /%}
```

{% /markdoc-example %}

And access the variables just like in a regular Markdoc document:

{% markdoc-example %}

```
{% $variableName %}
```

{% /markdoc-example %}
