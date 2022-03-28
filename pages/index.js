import React from 'react';
import Markdoc from '@markdoc/markdoc';

import { Editor, useMarkdocCode } from '../components/Sandbox';

const PATTERN = Buffer.from('NDI0Mg==', 'base64').toString();

const initialDocument = `---
title: Markdoc is a powerful, flexible Markdown-based authoring system
---
{% section %}

# {% $markdoc.frontmatter.title %} {% .jumbo %}

[Get started&nbsp;→](/docs/getting-started)

{% /section %}

{% section %}

{% sandbox height="600px" /%}

{% /section %}

{% section %}

{% table %}
---
- **Incrementally adoptable**

  From personal blogs to massive documentation sites. Markdoc is a content authoring framework that grows with you.
- **Writer & Dev friendly**

  Markdoc provides all the power and flexibility to developers, with none of the added complexity for tech writers.
- **Polymorphic**

  Markdoc can be used to create complex documentation experiences, static content sites, developer-tooling, and more.
{% /table %}

{% /section %}
 
{% section background="var(--contrast-light)" %}

{% side-by-side appearance="none" %}

{% item %}

## Get started quickly {% .jumbo %}

[Markdoc core](https://github.com/markdoc/markdoc) is a lightweight package containing everything you need to get started. If you want get going even faster, check out our [Next.js plugin](https://github.com/markdoc/next.js) and deploy a Markdoc documentation site with zero boilerplate.

[Explore documentation&nbsp;→](/docs/getting-started)

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

return Markdoc.render(content);
\`\`\`

{% /side-by-side %}

{% /section %}

{% section %}

{% side-by-side appearance="none" %}

### Built by Stripe {% .jumbo %}

Stripe created Markdoc to power its largest and most complex content site, stripe.com/docs. Since then, we have adopted it across the company, writing hundreds of thousands of lines of Markdoc to create thousands of pages of complex, custom documentation.

{% /side-by-side %}

{% /section %}

{% section %}

{% table %}
---
- **Familiar syntax**

  Markdoc is a syntactic extension of [Markdown](https://commonmark.org/), so you can keep using all the Markdown features and tooling you are used to.

  [Learn the syntax&nbsp;→](/docs/syntax)
- **Easily extensible**
  
  Markdoc lets you customize all aspects of the system, from [custom tags](/docs/tags) to entirely [new renderers](/docs/rendering).

  [Learn about rendering Markdoc&nbsp;→](/docs/rendering)
- **Built-in validation**
  
  You can add custom validation throughout your content system, ensuring nothing breaks and your content remains consistent.

  [Learn about custom validation&nbsp;→](/docs/validation)
{% /table %}

{% /section %}
`;

export default function Index() {
  const [doc, setDoc] = React.useState(initialDocument);
  const [showEditor, setShowEditor] = React.useState(false);
  const [keystrokes, setCount] = React.useState(0);

  const { config, content } = useMarkdocCode(doc);

  React.useEffect(() => {
    function handler(e) {
      if (e.key === 'i' && e.metaKey) {
        setShowEditor((mode) => !mode);
      } else if (e.key === 'Escape') {
        setShowEditor(false);
      } else if (e.key === PATTERN[keystrokes]) {
        if (keystrokes + 1 === PATTERN.length) {
          setShowEditor(true);
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

  return (
    <div className="full-width">
      {Markdoc.renderers.react(content, React, {
        components: config.components
      })}
      {/* TODO consider moving this to _app by exposing document content in pageProps */}
      <section
        className="sandbox in-page"
        style={{
          top: 'var(--nav-height)',
          position: 'fixed',
          transition: 'transform 300ms ease',
          width: '100%',
          height: 'calc(100vh - var(--nav-height))',
          transform: showEditor ? '' : 'translateY(100%)'
        }}
      >
        <Editor code={doc} onChange={setDoc} />
      </section>
    </div>
  );
}
