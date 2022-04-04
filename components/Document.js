import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { Editor, useMarkdocCode } from './Sandbox';

const PATTERN = Buffer.from('NDI0Mg==', 'base64').toString();

function EditPage({ source: initialDocument }) {
  const [doc, setDoc] = React.useState(initialDocument);
  const [showEditor, setShowEditor] = React.useState(false);
  const [keystrokes, setCount] = React.useState(0);
  const { content, config } = useMarkdocCode(doc);

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
      {Markdoc.renderers.react(content.children, React, {
        components: config.components
      })}
      <section className="sandbox in-page">
        <Editor code={doc} onChange={setDoc} />
        <button onClick={() => setShowEditor(false)}>
          <kbd>CMD + J / Esc</kbd>
        </button>
      </section>
      <style jsx>
        {`
          section {
            position: fixed;
            z-index: 999;
            top: var(--nav-height);
            left: 0;
            transition: transform 300ms ease;
            width: 100%;
            height: calc(100vh - var(--nav-height));
            transform: ${showEditor ? '' : 'translateY(100%)'};
          }
          button {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
          }
          kbd {
            color: var(--white);
          }
        `}
      </style>
    </>
  );
}

export function Document({ source, children }) {
  /**
   * Typically you would just render children here, but we are adding
   * this extra branch in order to pop up the editor that reveals
   * the source content for each document
   */
  return <article>{source ? <EditPage source={source} /> : children}</article>;
}
