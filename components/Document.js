import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { Editor, useMarkdocCode } from './Sandbox';

const PATTERN = Buffer.from('NDI0Mg==', 'base64').toString();

const WIDTH = 55;

function EditPage({ source: initialDocument }) {
  const [doc, setDoc] = React.useState(initialDocument);
  const [showEditor, setShowEditor] = React.useState(false);
  const [mouseOver, setMouseOver] = React.useState(false);
  const [keystrokes, setCount] = React.useState(0);
  const { content, config, errors } = useMarkdocCode(doc);

  React.useEffect(() => {
    if (mouseOver) {
      document.body.classList.add('modal-is-active');
    } else {
      document.body.classList.remove('modal-is-active');
    }
  }, [mouseOver]);

  React.useEffect(() => {
    window.__toggle_editor__ = () => setShowEditor((o) => !o);
    return () => {
      delete window.__toggle_editor__;
    };
  }, []);

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
      <div className="flex container">
        <div className="click-away" onClick={() => setShowEditor(false)} />
        <section
          className="sandbox"
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
        >
          <Editor code={doc} onChange={setDoc} errors={errors} />
          <button onClick={() => setShowEditor(false)}>
            <kbd>CMD + J / Esc</kbd>
          </button>
        </section>
      </div>
      <style jsx>
        {`
          .container {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 999;
            width: 100vw;
            height: 100vh;
            transition: transform 300ms ease;
            transform: ${showEditor ? 'translateX(0)' : 'translateX(100vw)'};
          }
          .click-away {
            width: ${100 - WIDTH}%;
            height: 100%;
          }
          section {
            width: ${WIDTH}%;
            height: 100%;
            border-left: 1px solid rgba(255, 255, 255, 0.22);
          }
          section :global(.CodeMirror),
          section :global(.react-codemirror2),
          kbd {
            color: white;
            background: var(--contrast-dark);
          }
          section :global(.CodeMirror-linenumber) {
            color: var(--white);
          }
          button {
            position: absolute;
            top: 0.8rem;
            right: 1rem;
          }
          kbd {
            color: var(--white);
          }
          @media screen and (max-width: 900px) {
            section {
              display: none;
            }
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
