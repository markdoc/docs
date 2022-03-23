import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { transformSchema } from '@markdoc/next.js/runtime';
import * as schema from '../markdoc';

import { Editor } from '../components/Editor';

const initialDocument = `# Markdoc is a powerful, flexible Markdown-based authoring system

> Built with ☕ at [Stripe](https://stripe.com)

{% button href="/docs/getting-started" %}Get started{% /button%}
{% button href="/sandbox" %}Try it online{% /button%}
`;

export default function Index() {
  const [mode, setMode] = React.useState(false);
  const [doc, setDoc] = React.useState(initialDocument);

  const ast = React.useMemo(() => Markdoc.parse(doc), [doc]);

  const config = React.useMemo(() => transformSchema(schema), []);

  const content = React.useMemo(
    () => Markdoc.process(ast, config),
    [ast, config]
  );

  React.useEffect(() => {
    function handler(e) {
      if (e.key === 'i' && e.metaKey) {
        setMode((mode) => !mode);
      } else if (e.key === 'Escape') {
        setMode(false);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (mode) {
    return (
      <section className="edit-mode">
        <Editor code={doc} onChange={setDoc} />
      </section>
    );
  }

  return (
    <div className="main">
      {Markdoc.renderers.react(content, React, {
        components: config.components,
      })}
    </div>
  );
}
