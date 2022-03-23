import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { transformSchema } from '@markdoc/next.js/runtime';
import * as schema from '../markdoc';

import { Editor } from '../components/Editor';

const initialDocument = `# Markdoc is a powerful, flexible Markdown-based authoring system

{% button href="/docs/getting-started" %}Get started{% /button%}
{% button href="/sandbox" %}Try it online{% /button%}
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
    <div className="main">
      {Markdoc.renderers.react(content, React, {
        components: config.components,
      })}
    </div>
  );
}
