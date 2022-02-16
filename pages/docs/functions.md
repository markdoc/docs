---
title: Functions
description: Functions let you extend Markdoc to run custom code.
---

# Functions

Functions let you extend Markdoc to run custom code.

## Built-in functions

{% table %}

- Function
- Returns
- Example
- Description

---

- `equals`
- `boolean`
- `equals($myString, 'test')`
- Performs common boolean operation

---

- `and`
- `boolean`
- `and($boolean1, $boolean2)`
- Performs common boolean operation

---

- `or`
- `boolean`
- `or($boolean1, $boolean2)`
- Performs common boolean operation

---

- `not`
- `boolean`
- `not(or($boolean1, $boolean2))`
- Performs common boolean operation

---

- `debug`
- `string`
- `debug($anyVariable)`
- Serializes the value as JSON, for debugging.

{% /table %}

## How to use functions

First, create a function definition:

```js
const includes = {
  render(parameters, config) {
    const [array, value] = Object.values(parameters);

    return Array.isArray(array) ? array.includes(value) : false;
  },
};
```

Then, pass the function to your `Config` object

```js
const config = {
  functions: {
    includes,
  },
};

return Markdoc.render(content, config);
```

Finally, call the function within your Markdoc content

{% markdoc-example %}

```md
{% if includes($countries, "AR") %}🇦🇷{% /if %}
{% if includes($countries, "AU") %}🇦🇺{% /if %}
{% if includes($countries, "ES") %}🇪🇸{% /if %}
{% if includes($countries, "JP") %}🇯🇵{% /if %}
{% if includes($countries, "NG") %}🇳🇬{% /if %}
{% if includes($countries, "US") %}🇺🇸{% /if %}
```

{% /markdoc-example %}
