import React from 'react';
import { Editor, useMarkdocCode } from '../components/Sandbox';

const PATTERN = Buffer.from('NDI0Mg==', 'base64').toString();

export function EditPage({ Component, initialDocument }) {
  const [doc, setDoc] = React.useState(initialDocument);
  const [showEditor, setShowEditor] = React.useState(false);
  const [keystrokes, setCount] = React.useState(0);
  const { content } = useMarkdocCode(doc);

  React.useEffect(() => {
    if (showEditor) {
      document.body.classList.add('modal-is-active');
    } else {
      document.body.classList.remove('modal-is-active');
    }
  }, [showEditor]);

  React.useEffect(() => {
    function handler(e) {
      if (e.key === 'j' && e.metaKey) {
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
    <>
      <Component markdoc={{ content }} />
      <section
        className="sandbox in-page"
        style={{
          zIndex: 999,
          top: 'var(--nav-height)',
          left: 0,
          position: 'fixed',
          transition: 'transform 300ms ease',
          width: '100%',
          height: 'calc(100vh - var(--nav-height))',
          transform: showEditor ? '' : 'translateY(100%)'
        }}
      >
        <Editor code={doc} onChange={setDoc} />
      </section>
    </>
  );
}
