---
title: Attributes
description: Attributes are used to pass data to tags in Markdoc.
---

# {% $markdoc.frontmatter.title %}

Attributes let you pass data to Markdoc tags.

## Defining attributes

Markdoc lets you configure custom attribute types for each [tag](/docs/tags). Assigning a type to an attribute limits which values an attribute can pass to a tag and, as a result, which values create errors during [validation](/docs/validation).

The following example defines an attribute for a `Callout` tag. By default, the attribute is set to `note` and validated against the `matches` array.

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

{% table %}

- Option
- Type
- Description

---

- `type`
- - `String` or `"String"`
  - `Boolean` or `"Boolean"`
  - `Number` or `"Number"`
  - `Object` or `"Object"`
  - `Array` or `"Array"`
  - A [Custom attribute](#create-a-custom-attribute) you create
- Specifies the data type of the attribute.

---

- `default`
- The value must be the same data type defined for the attribute and, if applicable, appear in `matches`.
- Specifies the default behavior of the attribute if no value is provided.

---

- `required`
- - `true`
  - `false`
- Specifies whether a value must be passed to the attribute. If no value is provided, the system throws an error.

---

- `matches`
- A regular expression, array of strings, or function that takes an option and returns strings.
- Specifies a string pattern to match against an attribute value.

---

- `errorLevel`
- - `debug`
  - `info`
  - `warning`
  - `error`
  - `critical`
- Specifies how Markdoc reports a validation error. Errors are ordered in ascending severity.

{% /table %}

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

Then, pass the custom attribute to your tag definition in your [`Config` object](/docs/syntax#config)

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

## Next steps

- [Pass variables to attributes](/docs/variables)
