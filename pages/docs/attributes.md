---
title: Attributes
description: Attributes are used to pass data to tags in Markdoc.
---

# {% $markdoc.frontmatter.title %}

Attributes let you pass data to tags

## Defining attributes

Markdoc allows you to configure custom attribute types for each [tag](/docs/tags). Assigning a type to an attribute limits which values an attribute can pass to a tag, and consequently which values create errors during [validation](/docs/validation). 

The following example defines an attribute for a `Callout` tag. By default, the attribute is set to `note`, and the value is validated agatinst the `matches` array. 

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
* Type
* Definition
* Accepted value(s)
---
* `type`
* Specifies the data type of the attribute.
* * `String` or `"String"`
  * `Boolean` or `"Boolean"`
  * `Number` or `"Number"`
  * `Object` or `"Object"`
  * `Array` or `"Array"`
  * [Custom attribute](#create-a-custom-attribute)
---
* `default`
* Specifies the default behavior of the attribute if no value is provided. 
* The value must be the same data type defined for the attribute, and if applicable, appear in `matches`.
---
* `required`
* Specifies that a value must be passed to the attribute. If no value is provided, an error is thrown.
* * `true`
  * `false` 
---
* `matches`
* Specifies a string pattern for the attribute value to match.
* A regular expression, array of strings, or function that takes an option and returns strings.  
---
* `errorLevel`
* Specifies how Markdoc will report a validation error.
* * `debug` 
  * `info`
  * `warning`
  * `error`
  * `critical`
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

## Next steps

- [Pass variables to attributes](/docs/variables)
