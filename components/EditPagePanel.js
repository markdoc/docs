import React from 'react';

const PATTERN = Buffer.from('NDI0Mg==', 'base64').toString();
const WIDTH = 55;

const MARKDOC_CLIENT_ID = '3a8716adbaa6294da1ec';
function CreatePRButton({ createPR }) {
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <button
        className="create-pr-btn"
        onClick={async () => {
          // TODO: oauth is so annoying. We have to auth this and then get the code back, pass that to the server, but
          // it makes the UX annoying
          window.open(
            `https://github.com/login/oauth/authorize?client_id=${MARKDOC_CLIENT_ID}&redirect_uri=${window.location.href}`
          );
          setLoading(true);
          const prNumber = await createPR();
          window.open(
            `https://github.com/markdoc/docs/pull/${prNumber}`,
            '_blank'
          );
          setLoading(false);
        }}
      >
        {loading ? 'Creating...' : 'Create PR'}
      </button>
      <style jsx>
        {`
          .create-pr-btn {
            position: absolute;
            bottom: 0.8rem;
            right: 1rem;
            top: inherit;
            background: #ffd849;
            font-size: 12px;
            padding: 5px 12px;
          }
        `}
      </style>
    </div>
  );
}

export function EditPagePanel({ docChanged, children, createPR }) {
  const [showEditor, setShowEditor] = React.useState(false);
  const [mouseOver, setMouseOver] = React.useState(false);
  const [keystrokes, setCount] = React.useState(0);

  React.useEffect(() => {
    if (mouseOver) {
      document.body.classList.add('modal-is-active');
    } else {
      document.body.classList.remove('modal-is-active');
    }
  }, [mouseOver]);

  React.useEffect(() => {
    window.__toggle_editor__ = () => setShowEditor((o) => !o);

    function handler(e) {
      e.preventDefault();
      window.__toggle_editor__();
    }
    const elements = document.querySelectorAll('.live-edit');
    elements.forEach((el) => el.addEventListener('click', handler));

    return () => {
      elements.forEach((el) => el.removeEventListener('click', handler));
      delete window.__toggle_editor__;
    };
  }, []);

  React.useEffect(() => {
    function handler(e) {
      if (e.key === 'j' && e.metaKey) {
        e.preventDefault();
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
    <div className="flex container">
      <div className="click-away" onClick={() => setShowEditor(false)} />
      <section
        className="sandbox"
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        {children}
        <button onClick={() => setShowEditor(false)}>
          <kbd>CMD + J / Esc</kbd>
        </button>
        {docChanged && <CreatePRButton createPR={createPR} />}
      </section>
      <style jsx>
        {`
          .container {
            position: fixed;
            top: 0;
            left: 100vw;
            z-index: 999;
            width: 100vw;
            height: 100vh;
            transition: transform 300ms ease;
            transform: ${showEditor ? 'translateX(-100vw)' : 'translateX(0)'};
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
          button {
            position: absolute;
            top: 0.8rem;
            right: 1rem;
          }
          kbd {
            color: var(--white);
          }
          @media screen and (max-width: 1000px) {
            section {
              display: none;
            }
            :global(.live-edit) {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
