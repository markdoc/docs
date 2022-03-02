---
title: Functions
description: Functions let you extend Markdoc to run custom code.
---

# {% $markdoc.frontmatter.title %}

Functions let you extend Markdoc with custom utilities, which let you transform your content and variables at runtime.

## Creating a custom function

To extend Markdoc with your own functions, first create custom function definitions:

```js
const includes = {
  render(parameters, config) {
    const [array, value] = Object.values(parameters);

    return Array.isArray(array) ? array.includes(value) : false;
  },
};

const uppercase = {
  render(parameters, config) {
    const string = parameters['0'];

    return typeof string === 'string' ? string.toUpperCase() : string;
  },
};
```

Then, pass the functions to your `Config` object

```js
const config = {
  functions: {
    includes,
    uppercase,
  },
};

return Markdoc.render(content, config);
```

Finally, call the functions within your Markdoc content

{% markdoc-example %}

```md
{% if includes($countries, "AR") %} 🇦🇷 {% /if %}
{% if includes($countries, "AU") %} 🇦🇺 {% /if %}
{% if includes($countries, "ES") %} 🇪🇸 {% /if %}
{% if includes($countries, "JP") %} 🇯🇵 {% /if %}
{% if includes($countries, "NG") %} 🇳🇬 {% /if %}
{% if includes($countries, "US") %} 🇺🇸 {% /if %}
```

{% /markdoc-example %}

## Built-in functions

Markdoc comes out-of-the-box with 5 built-in functions: `equals`, `and`, `or`, `not`, and `debug`.

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

### And, Or, and Not

Use these functions with the `if` [tag](/docs/tags) to perform boolean operations and render the content content when the condition is met.

{% markdoc-example %}

```
This is always shown
{% if and(not($a), or($b, $c)) %}
This is shown only if $a is falsy and either $b or $c is true.
{% /if %}
```

{% /markdoc-example %}

### Equals

Use the `equals` function to compare a variable against a given value. This function uses JavaScript's strict equality semantics, and is only used for primitive types.

{% markdoc-example %}

```
{% if equals($myVar, "test") %}
The variable $myVar is equal to the string "test".
{% /if %}
```

{% /markdoc-example %}

### Debug

This function simply renders the value as serialized JSON value in the document. This can be useful for determining what value is in a [variable](/docs/syntax#variables).

{% markdoc-example %}

```
{% debug($myVar) %}
```

{% /markdoc-example %}
