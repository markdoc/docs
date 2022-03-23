import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { transformSchema } from '@markdoc/next.js/runtime';
import * as schema from '../markdoc';

import { Editor } from '../components/Editor';

const initialDocument = `
{% section %}

# Markdoc is a powerful, flexible Markdown-based authoring system

{% button href="/docs/getting-started" %}Get started{% /button%}
{% button href="/sandbox" %}Try it online{% /button%}

{% /section %}

{% section %}

{% table %}

- Incrementally adoptable
- Writer friendly; Developer friendly
- Polymorphic
---
- A content authoring framework that grows with you. 
- Markdoc provides all the power and flexibility to developers, with none of the added complexity for writers.  
- Use Markdoc to create engaging documentation experiences, static content sites, developer-tooling, and more.

{% /table %}

{% /section %}

{% section %}

## Get started quickly

[Markdoc core](https://github.com/markdoc/markdoc) is a lightweight package containing everything you need to get started. If you want get going even faster, check out our [Next.js plugin](https://github.com/markdoc/next.js) and deploy a Markdoc documentation site with zero boilerplate.

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


{% /section %}

{% comment %}
{% section %}

{% sandbox /%}

{% /section %}
{% /comment %}

{% section background="theme" %}

## Built by Stripe

Stripe created Markdoc to power its largest and most complex content site, stripe.com/docs. Since then, we have adopted it across the company, writing hundreds of thousands of lines of Markdoc to create thousands of pages of complex, custom documentation.

{% /section %}

{% /section %}

{% section %}

{% table %}

- Familiar syntax
- Easily extensible
- Built-in validation
---
- Markdoc is a syntactic extension of [Markdown](https://commonmark.org/), so you can keep using all the Markdown features and tooling you are used to.

  [Learn the syntax →](/docs/syntax)
- Markdoc lets you customize all aspects of the system, from [custom tags](/docs/tags) to entirely [new renderers](/docs/rendering).

  [Learn about rendering Markdoc →](/docs/rendering)
- You can add custom validation throughout your content system, ensuring nothing breaks and your content remains consistent.

  [Learn about custom validation →](/docs/validation)
{% /table %}

{% /section %}
`;

export default function Index() {
  const [mode, setMode] = React.useState(false);
  const [keystrokes, setCount] = React.useState(0);
  const [doc, setDoc] = React.useState(initialDocument);

  const ast = React.useMemo(() => Markdoc.parse(doc), [doc]);

  const config = React.useMemo(() => transformSchema(schema), []);

  const content = React.useMemo(
    () => Markdoc.process(ast, config),
    [ast, config]
  );

  React.useEffect(() => {
    // Detect 4242
    function handler(e) {
      if (e.key === 'i' && e.metaKey) {
        setMode((mode) => !mode);
      } else if (e.key === 'Escape') {
        setMode(false);
      } else if (
        (e.key === '4' && keystrokes === 0) ||
        (e.key === '2' && keystrokes === 1) ||
        (e.key === '4' && keystrokes === 2)
      ) {
        setCount((k) => k + 1);
      } else if (e.key === '2' && keystrokes === 3) {
        setMode((mode) => !mode);
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
      <section className="edit-mode">
        <Editor code={doc} onChange={setDoc} />
      </section>
    );
  }

  return (
    <div className="full-width">
      {Markdoc.renderers.react(content, React, {
        components: config.components,
      })}
    </div>
  );
}
