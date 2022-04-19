---
title: Attributes
description: Attributes are used to pass data to tags in Markdoc.
---

# {% $markdoc.frontmatter.title %}

## Defining attributes

Markdoc allows you to configure custom attribute types for each [tag](/docs/tags). These definitions constrain what types of values can be passed, and which will create errors during [validation](/docs/validation).

```js
{
  render: 'Callout',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      required: true,
      matches: ['caution', 'check', 'note', 'warning'],
      errorLevel: 'critical',
    },
  }
};
```

### Attribute types

Passing a `type` will validate that the value passed to the specified attribute is an instance of that type. Markdoc supports the following `type` options:

- `String` or `"String"`
- `Boolean` or `"Boolean"`
- `Number` or `"Number"`
- `Object` or `"Object"`
- `Array` or `"Array"`

Or you can pass your own [custom attribute types](#create-a-custom-attribute).

### Default values

You can use the `default` field to set a default value if there is no attribute passed.

### Required values

Set `required: true` if a value must be passed to a specific attribute.

### Matching a pattern

You can use the `matches` field to define a string pattern for this attribute to match. You can either pass a JavaScript regular expression, or an array of possible strings.

### Setting an error level

For each attribute, you can update the `errorLevel` field to adjust how Markdoc reports the validation error (e.g. pass `warning` if it is not a critical error). Here are the possible error levels:

- `debug`
- `info`
- `warning`
- `error`
- `critical`

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

  transform(value, config) {
    return Date.parse(value);
  }
}
```

Then, pass the custom attribute to your tag definition in your [`Config` object](/docs/config)

```js
const config = {
  tags: {
    'tag-name': {
      render: 'YourComponent',
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
