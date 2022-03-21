---
title: Attributes
description:
---

# {% $markdoc.frontmatter.title %}


## Create a custom attribute

With Markdoc you can create custom attributes, which can be used within tags. In this example, you're creating a `DateTime` attribute that makes sure a valid string is provided.

```js
// ./attribute-types/DateTime.js

import type {Config} from 'docs/markdoc';

export class DateTime {
  validate(value, config) {
    if (typeof value !== 'string' || isNaN(Date.parse(value)))
      return [
        {
          id: 'invalid-datetime-type',
          level: 'critical',
          message: 'Must be a string with a valid date format',
        },
      ];

    return [];
  }

  render(value: any, config: Config) {
    return Date.parse(value);
  }
}
```

Next, import the custom attribute into your element:

{% comment %}
TODO: Provide a bit more information about what needs to be done.
{% /comment %}

```js
import {DateTime} from './attribute-types'

export YourComponent = {
    tag: 'tag-name',
    component: 'YourComponent',
    attributes: {
        created: {
            type: DateTime,
            required: true,
        },
    },
};
```