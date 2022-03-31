---
title: Attributes
description: Attributes are used to pass data to tags in Markdoc.
---

# {% $markdoc.frontmatter.title %}

## Create a custom attribute

With Markdoc you can create custom attributes, which can be used within tags. In this example, you're creating a `DateTime` attribute that makes sure a valid string is provided.

```js
// ./attribute-types/DateTime.js

export class DateTime {
  validate(value, config) {
    if (typeof value !== 'string' || isNaN(Date.parse(value)))
      return [
        {
          id: 'invalid-datetime-type',
          level: 'critical',
          message: 'Must be a string with a valid date format'
        }
      ];

    return [];
  }

  render(value, config) {
    return Date.parse(value);
  }
}
```

Then, pass the custom attribute to your tag definition in your [`Config` object](/docs/config)

```js
const config = {
  tags: {
    'tag-name': {
      tag: 'YourComponent',
      attributes: {
        created: {
          type: DateTime,
          required: true
        }
      }
    }
  }
};
```

{% comment %}
TODO: Make sure to link to docs about config with reference for things like tag-name.
{% /comment %}
