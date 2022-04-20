---
title: Introduction
description: Introduction
---

# {% $markdoc.frontmatter.title %} {% .main-title %}

This boilerplate has a simple architecture to help you get started:

```bash
components/
|-- Banner.js
|-- NavBar.js
|-- ToC.js
|-- Resource.js
markdoc/
|-- Banner.markdoc.js
|-- Resource.markdoc.js
pages/
|-- docs/
    |-- introduction.md
    |-- resources.md
    _app.js
    index.md
public/
```

If you want to create custom components, create new `.js` files inside the `components` folder.
To use them in your Markdown files, create a corresponding `.markdoc.js` file under the `markdoc` folder.

For example, in the `components` folder, you will find a custom banner component in the file `Banner.js`. You'll also find `Banner.markdoc.js` that contains the following content:

```js
// Banner.markdoc.js
import Banner from "../components/Banner";

export const banner = {
  Component: Banner,
  attributes: {
    type: {
      type: String,
      required: true,
    },
  },
};
```

You can then use your components either as a self-closing tag if it doesn't contain children, or as a wrapper around content in your Markdown.

`{% banner type="warning" / %}`

or

`{% banner type="warning" %} Some content {% /banner %}`

The banner component renders like this:

{% banner type="warning" %}
This is a custom banner component of type warning
{% /banner %}
