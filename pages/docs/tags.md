---
title: Tags
description: Tags are used to extend Markdown. With tags you can use native Markdoc components or custom-built React components.
---

# {% $markdoc.frontmatter.title %}

Tags are an extension of standard Markdown. With tags you can use native Markdoc components, like list tables, conditionals, and partials, or custom-built React components. 

## Conditionals

Dynamically render content when specific conditions are met using the `{% if %}` and `{% else %}` tags. In Markdoc, conditionals are used with [variables]() and [functions]().

### if

Use the `if` tag to render content when a condition evaluates to `true`. 

{% markdoc-example %}
```
This is shown no matter what.

{% if $myFunVar %}
Only appear if myFunVar!
{% /if %}
```
{% /markdoc-example %}

### if not

Use the `not` function with the `if` tag to render content when a condition is not met (or evaluates to `false`).

{% markdoc-example %}
```
{% if not($myFunVar) %}
Only appear if myFunVar is **not** true
{% /if %}
```
{% /markdoc-example %}

### if equals 

Use the `equals` function to compare a variable against a given value. This function uses JavaScript's strict equality semantics, and should only be used for primitive types.

{% markdoc-example %}
```
{% if equals($myFunVar, "test") %}
The variable `$myFunVar` is equal to the string `"test"`.
{% /if %}
```
{% /markdoc-example %}

### if/else

With the `else` tag you can render alternate content when the if condition isn't met. 

{% markdoc-example %}
```
{% if $myFunVar %}
Only appear if myFunVar!
{% else /%}
This appears if not myFunVar!
{% /if %}


{% if $myFunVar %}
Only appear if myFunVar!
{% else $otherFunVar /%}
This appears if not myFunVar and otherFunVar!
{% else /%}
This appears if not myFunVar and not otherFunVar
{% /if %}
```
{% /markdoc-example %}

The `else` tag accepts a condition, which lets you use it like an else/if statement. You can use multiple else statements with conditions inside the same `if` tag. 

The final `else` tag triggers when nono of the `if` or `else` conditions are met.

{% markdoc-example %}
```
{% if $foo %}
The variable `$foo` is true
{% else $bar /%}
The variable `$bar` is true
{% else $baz /%}
The variable `$baz` is true
{% else /%}
None of the variables are true
{% /if %}
```
{% /markdoc-example %}

You can even use conditionals within code blocks:

{% markdoc-example %}
```js
outcome: {
  {% if $declines.gate_network_decline_code_on_charges %}
  network_decline_code: "54",
  {% /if %}
  network_status: "declined_by_network",
  reason: "expired_card",
  risk_level: "normal",
  {% if $declines.flag_radar_scores_for_everyone %}
  risk_score: 38,
  {% /if %}
  seller_message: "The bank returned the decline code `expired_card`.",
  type: "issuer_declined"
},
```
{% /markdoc-example %}

### and/or

{% markdoc-example %}
```
This is always shown
{% if and($a, or($b, $c)) %}
This is shown only if $a and either $b or $c is true.
{% /if %}
```
{% /markdoc-example %}

## Partials

## Tables

While GitHub Flavored Markdown (GFM) tables are supported, Markdoc uses a list based syntax that allows for easy injection of rich content, like bulleted lists and code samples.

### Basic table

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

### Table with rich content

### Table without headings

### Set column and row span 

### Set column width

### Highlight a column

### Text wrapping (fixed layout)

### Text alignment

## See also

* [Frontmatter]()
* [Functions]()
* [Variables]()
