---
title: Markdoc is a powerful, flexible Markdown-based authoring framework
---

{% section %}

{% typewriter %}
Markdoc is a powerful, flexible Markdown-based authoring system.
{% /typewriter %}

> From personal blogs to massive documentation sites,  
> Markdoc is a content authoring system that grows with you.

[Get started&nbsp;→](/docs/getting-started) {% .primary %}

{% /section %}

{% section %}

{% sandbox height="600px" /%}

{% /section %}

{% section %}

{% table %}

---

- **Open source**

  TODO Maintain full control over your code and content. Markdoc is open-source and fully extensible.

- **Writer & Dev friendly**

  Markdoc provides all the power and flexibility to developers, with none of the added complexity for tech writers.

- **Polymorphic**

  Markdoc can be used to create interactive documentation experiences, static content sites, developer-tooling, and more.

{% /table %}

{% /section %}

{% section background="var(--contrast-light)" className="dark" %}

{% side-by-side %}

{% item %}

## Get started quickly {% .jumbo %}

[Markdoc core](https://github.com/markdoc/markdoc) is a lightweight package containing everything you need to get started. If you want get going even faster, check out our [Next.js plugin](https://github.com/markdoc/next.js) and deploy a Markdoc documentation site with zero boilerplate.

[Explore documentation&nbsp;→](/docs/getting-started) {% .primary %}

{% /item %}

```bash
npm install @markdoc/markdoc
```

```js
import Markdoc from '@markdoc/markdoc';

const doc = `
# Hello world.
> My first Markdoc page
`;

const ast = Markdoc.parse(doc);

const content = Markdoc.process(ast, config);

return Markdoc.render(content);
```

{% /side-by-side %}

{% /section %}

{% section background="var(--contrast-gray)" %}

{% fancy-heading title="Built by Stripe" %}

Stripe created Markdoc to power its largest and most detailed content site. Since then, we have adopted it across the company, writing hundreds of thousands of lines of Markdoc to create thousands of pages of expressive, custom documentation.

{% /fancy-heading %}

{% /section %}

{% section background="var(--contrast-gray)" %}

{% features %}

- **Familiar syntax**

  Markdoc is a syntactic extension of [Markdown](https://commonmark.org/), so you can keep using all the features and tooling you are used to.

  [Learn the syntax&nbsp;→](/docs/syntax)

- **Easily extensible**

  Markdoc lets you customize all aspects of the system, from [custom tags](/docs/tags) to entirely [new renderers](/docs/rendering).

  [Learn about rendering Markdoc&nbsp;→](/docs/rendering)

- **Built-in validation**

  You can add custom validation throughout your content system, ensuring nothing breaks and your content remains consistent.

  [Learn about custom validation&nbsp;→](/docs/validation)

{% /features %}

{% /section %}
