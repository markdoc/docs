import React from 'react';
import Markdoc from '@markdoc/markdoc';

import { Editor, useMarkdocCode } from '../components/Sandbox';

const PATTERN = Buffer.from('NDI0Mg==', 'base64').toString();

const initialDocument = `---
title: Markdoc is a powerful, flexible Markdown-based authoring system
---
{% section %}

# {% $markdoc.frontmatter.title %} {% .jumbo %}

[Get started →](/docs/getting-started)

{% /section %}

{% section %}

{% features features=[
  {title: "Incrementally adoptable", description: "A content authoring framework that grows with you."},
  {title: "Writer & Dev friendly", description: "We provides all the power and flexibility to developers, with none of the added complexity for tech writers."},
  {title: "Polymorphic", description: "Markdoc can be used to create complex documentation experience, static content sites, developer-tooling."}] /%}

{% /section %}
 
{% section background="var(--theme)" %}

{% side-by-side appearance="none" %}

{% item %}

## Get started quickly {% .jumbo %}

[Markdoc core](https://github.com/markdoc/markdoc) is a lightweight package containing everything you need to get started. If you want get going even faster, check out our [Next.js plugin](https://github.com/markdoc/next.js) and deploy a Markdoc documentation site with zero boilerplate.

{% /item %}

\`\`\`bash
npm install @markdoc/markdoc
\`\`\`

\`\`\`js
import Markdoc from '@markdoc/markdoc';

const document = \`
# Hello world!
> My first Markdoc page
\`

const ast = Markdoc.parse(document);

const content = Markdoc.process(ast, config);

return Markdoc.renderers.react(content, React, {components});
\`\`\`

{% /side-by-side %}

{% /section %}

{% comment %}
{% section %}

{% sandbox /%}

{% /section %}
{% /comment %}

{% section %}

{% side-by-side appearance="none" %}

### Built by Stripe {% .jumbo %}

Stripe created Markdoc to power its largest and most complex content site, stripe.com/docs. Since then, we have adopted it across the company, writing hundreds of thousands of lines of Markdoc to create thousands of pages of complex, custom documentation.

{% /side-by-side %}

{% /section %}

{% /section %}

{% section %}

{% table %}
---
- **Familiar syntax**

  Markdoc is a syntactic extension of [Markdown](https://commonmark.org/), so you can keep using all the Markdown features and tooling you are used to.

  [Learn the syntax →](/docs/syntax)
- **Easily extensible**
  
  Markdoc lets you customize all aspects of the system, from [custom tags](/docs/tags) to entirely [new renderers](/docs/rendering).

  [Learn about rendering Markdoc →](/docs/rendering)
- **Built-in validation**
  
  You can add custom validation throughout your content system, ensuring nothing breaks and your content remains consistent.

  [Learn about custom validation →](/docs/validation)
{% /table %}

{% /section %}
`;

export default function Index() {
  const [doc, setDoc] = React.useState(initialDocument);
  const [mode, setMode] = React.useState(false);
  const [keystrokes, setCount] = React.useState(0);

  const { config, content } = useMarkdocCode(doc);

  React.useEffect(() => {
    function handler(e) {
      if (e.key === 'i' && e.metaKey) {
        setMode((mode) => !mode);
      } else if (e.key === 'Escape') {
        setMode(false);
      } else if (e.key === PATTERN[keystrokes]) {
        if (keystrokes + 1 === PATTERN.length) {
          setMode(true);
        } else {
          setCount((k) => k + 1);
        }
      } else {
        setCount(0);
      }
    }

    window.addEventListener('keydown', handler);
    // Reset pattern after timeout
    const timeout = setTimeout(() => setCount(0), 500);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(timeout);
    };
  }, [keystrokes]);

  if (mode) {
    return (
      <section className="sandbox">
        <Editor code={doc} onChange={setDoc} />
      </section>
    );
  }

  return (
    <div className="full-width">
      {Markdoc.renderers.react(content, React, {
        components: config.components
      })}
    </div>
  );
}
