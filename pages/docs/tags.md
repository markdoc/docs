---
title: Tags
description: Tags are used to extend Markdown. With tags you can use native Markdoc components or custom-built React components.
---

# {% $markdoc.frontmatter.title %}

Tags are an extension of standard Markdown. With tags you can use native Markdoc components, like list tables, conditionals, and partials, or custom-built React components. 

## Conditionals

Dynamically render content when specific conditions are met using the `{% if %}` and `{% else %}` tags. In Markdoc, conditionals are used with [variables](./variables) and [functions](./functions).

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

With the `else` tag you can render alternate content when the if condition isn't met. The `else` tag accepts a condition, which lets you use it like an else/if statement. You can use multiple else statements with conditions inside the same `if` tag. 

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

The final `else` tag triggers when none of the `if` or `else` conditions are met.

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

Partials are primarily used to reuse text or code examples across docs. The reusable information (text or code) is stored in a separate markdown file, and referenced from within the partial tag. A common convention is to store partials in a directory called `partial`.

{% markdoc-example %}
```
This is an example of including the `/docs/content/partials/libraries.md` file as a partial.

{% partial file="variables.md" /%}
```
{% /markdoc-example %}

### Variables 

{% markdoc-example %}
```
Here the `formComponentName` variable is passed into the partial as 'MarkdocPartialVariableTest':

{% partial file="partials/react-stripe-setup.md" variables={formComponentName: "MarkdocPartialVariableTest"} /%}
```
{% /markdoc-example %}


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

{% markdoc-example %}
```
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
```
{% /markdoc-example %}


### Table without headings

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

### Set column and row span 

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

### Set column width

{% markdoc-example %}
```
{% table %}
* Column 1 {% width=60 %}
* Column 2
---
* foo
* bar
{% /table %}
```
{% /markdoc-example %}
### Highlight a column

{% markdoc-example %}
```
{% table highlightCol=2 type="solid" %}
* Heading 1
* Heading 2 {% badge color="blue" label="Recommended" /%}
* Heading 3
---
* Row 1 Cell 1
* Row 1 Cell 2
* Row 1 Cell 3
---
* Row 2 Cell 1
* Row 2 cell 2
* Row 2 Cell 3
{% /table %}
```
{% /markdoc-example %}

### Text wrapping (fixed layout)

{% markdoc-example %}
```
{% table fixed=true %}
* Column 1
* Column 2
* Column 3
---
* foo
* bar
* `charge.payment_method_details.card.three_d_secure.succeeded`
{% /table %}
```
{% /markdoc-example %}

### Text alignment

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
