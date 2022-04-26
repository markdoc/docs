import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useRouter } from 'next/router';
import Markdoc from '@markdoc/markdoc';
import { getSchema } from '@markdoc/next.js/runtime';

import * as tags from '../markdoc/tags';
import * as nodes from '../markdoc/nodes';
import * as functions from '../markdoc/functions';

const schema = {
  tags,
  nodes,
  functions
};

const INITIAL_CODE = `---
title: What is Markdoc?
---

# {% $markdoc.frontmatter.title %} {% #overview %}

Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites. Stripe created Markdoc to power [our public docs](http://stripe.com/docs).

{% callout type="check" %}
Markdoc is open-source—check out it's [source](http://github.com/markdoc/markdoc) to see how it works.
{% /callout %}

## How is Markdoc different?

Markdoc uses a fully declarative approach to composition and flow control, where other solutions…[read more](/docs/overview)

## Next steps
- [Install Markdoc](/docs/getting-started)
- [Try it out online](/sandbox)
`;

export function useMarkdocCode(code) {
  const ast = React.useMemo(() => Markdoc.parse(code), [code]);

  const config = React.useMemo(() => {
    const { components, ...rest } = getSchema(schema);
    // require here to prevent Webpack Promise issue
    const yaml = require('js-yaml');
    return {
      ...rest,
      variables: {
        markdoc: {
          frontmatter: ast.attributes.frontmatter
            ? yaml.load(ast.attributes.frontmatter)
            : {}
        },
        invalid_code: `\n{% callout %}\nHere!\n`
      },
      components
    };
  }, [ast]);

  const content = React.useMemo(
    () => Markdoc.transform(ast, config),
    [ast, config]
  );

  const errors = React.useMemo(
    () => Markdoc.validate(ast, config),
    [ast, config]
  );

  return { ast, content, config, errors };
}

function EditorInternal({ code, onChange, options, errors, cursor }) {
  const ref = React.useRef();
  const [key, setKey] = React.useState(0);

  const codeMirrorOptions = React.useMemo(
    () => ({
      ...options,
      autofocus: Boolean(cursor),
      styleSelectedText: true,
      lineNumbers: true,
      theme: 'none',
      mode: 'markdoc',
      lineWrapping: true
    }),
    [options, cursor]
  );

  const onBeforeChange = React.useCallback(
    (editor, meta, code) => onChange(code),
    [onChange]
  );

  React.useEffect(() => {
    if (errors.length) {
      const markers = [];
      const editor = ref.current?.editor;

      if (editor) {
        errors.forEach((error) => {
          try {
            const from = {
              line: error.location?.start.line - 1,
              ch: error.location?.start.character
            };
            const to = {
              line: error.location?.end.line - 1,
              ch: error.location?.end.character
            };

            markers.push(
              editor.markText(from, to, {
                className: 'syntax-error',
                attributes: {
                  'data-title': error.error.message,
                  'aria-label': error.error.message
                }
              })
            );
          } catch (error) {
            console.error(error);
          }
        });
      }

      return () => markers.forEach((mark) => mark.clear());
    }
  }, [errors]);

  React.useLayoutEffect(() => {
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/xml/xml');
    require('./Codemirror/markdoc');
    require('codemirror/addon/selection/mark-selection');
    setKey((k) => k + 1);
  }, []);

  return (
    <>
      <CodeMirror
        ref={ref}
        key={key}
        value={code}
        options={codeMirrorOptions}
        onBeforeChange={onBeforeChange}
        cursor={cursor}
      />
      <style jsx>
        {`
          :global(.syntax-error) {
            text-decoration: red wavy underline;
            text-decoration-skip-ink: none;
          }

          /* Tooltip */
          :global(.syntax-error::before) {
            content: attr(data-title);
            position: absolute;
            display: none;
            color: var(--black);
            background: var(--white);
            bottom: 20px;
            padding: 1px 4px;
            border-radius: 4px;
            z-index: 999;
          }

          /* Tooltip triangle */
          :global(.syntax-error::after) {
            content: '';
            position: absolute;
            display: none;
            bottom: 12px;
            left: 12px;
            border-width: 4px;
            border-style: solid;
            border-color: var(--white) transparent transparent transparent;
          }

          :global(.syntax-error:hover::before),
          :global(.syntax-error:hover::after) {
            display: inline-block;
          }
        `}
      </style>
    </>
  );
}

export function Editor(props) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Codemirror doesn't work w/ SSR
  return mounted ? <EditorInternal {...props} /> : null;
}

const DELAY = 50;
function Cursor({ children }) {
  const ref = React.useRef();
  const [pos, setPos] = React.useState({});

  React.useEffect(() => {
    function handler(event) {
      const el = ref.current;
      if (el) {
        setPos({
          top: event.clientY - 13,
          left: event.clientX + 16
        });
      }
    }

    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  const letters = React.useMemo(
    () =>
      children.split('').map((l, i) => (
        <span
          key={`${l}_${i}`}
          style={{
            top: pos.top,
            left: pos.left + i * 8,
            transition: [
              `top ${DELAY}ms linear ${i * 1}ms`,
              `left ${DELAY}ms linear ${i * 1}ms`
            ].join()
          }}
        >
          {l}
        </span>
      )),
    [children, pos]
  );

  return (
    <div id="hover" ref={ref}>
      {letters}
      <style jsx>
        {`
          #hover {
            display: none;
            position: fixed;
            color: var(--white);
            mix-blend-mode: difference;
            font-family: var(--mono);
            font-size: 13px;
            font-weight: 400;
            line-height: 27px;
            letter-spacing: -0.03em;
            z-index: 999;
          }

          #hover :global(span) {
            position: fixed;
            will-change: top, left;
          }

          :global(.preview:hover #hover span) {
            padding-top: 7px;
          }

          /* Show 'Try' text on hover on the landing page */
          :global(.page--landing .sandbox .container:hover) #hover {
            display: block;
          }
        `}
      </style>
    </div>
  );
}

const initialCursor = { line: 0, ch: 3 };
export function Sandbox({ height, options }) {
  const router = useRouter();
  const [code, setCode] = React.useState(INITIAL_CODE);
  const [mode, setMode] = React.useState('preview');
  const [hasTyped, setHasTyped] = React.useState(false);

  const { ast, content, config, errors } = useMarkdocCode(code);

  React.useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get('mode');
    if (mode) {
      setMode(mode);
    }
  }, []);

  React.useEffect(() => {
    if (mode && window.location.pathname === '/sandbox') {
      const query = new URLSearchParams(window.location.search);
      query.set('mode', mode);
      history.replaceState(null, '', '?' + query.toString());
    }
  }, [mode]);

  return (
    <div className="sandbox">
      <nav>
        <button onClick={() => setCode(INITIAL_CODE)}>Reset</button>
        <div className="btn-group">
          {router.pathname === '/' ? (
            <button onClick={() => router.push('/sandbox')}>
              Explore developer sandbox&nbsp;→
            </button>
          ) : (
            <>
              <button
                className={mode === 'preview' ? 'active' : undefined}
                onClick={() => setMode('preview')}
              >
                React
              </button>
              <button
                className={mode === 'transform' ? 'active' : undefined}
                onClick={() => setMode('transform')}
              >
                Renderable tree
              </button>
              <button
                className={mode === 'ast' ? 'active' : undefined}
                onClick={() => setMode('ast')}
              >
                AST
              </button>
            </>
          )}
        </div>
      </nav>
      <div className="flex container">
        <section className="left">
          <Editor
            code={code}
            onChange={(...args) => {
              setHasTyped(true);
              setCode(...args);
            }}
            options={options}
            errors={errors}
            cursor={initialCursor}
          />
        </section>
        <section className="right dark">
          {mode === 'preview' && (
            <div className="preview">
              {hasTyped ? null : <Cursor>Try it out</Cursor>}
              {Markdoc.renderers.react(content, React, {
                components: config.components
              })}
            </div>
          )}
          {mode === 'transform' && (
            <CodeMirror
              value={JSON.stringify(content, null, 2)}
              options={{
                mode: 'application/json',
                lineWrapping: true,
                readOnly: true
              }}
            />
          )}
          {mode === 'ast' && (
            <CodeMirror
              value={JSON.stringify(ast, null, 2)}
              options={{
                mode: 'application/json',
                lineWrapping: true,
                readOnly: true
              }}
            />
          )}
        </section>
      </div>
      <style jsx>
        {`
          .sandbox {
            width: 100%;
            height: ${height};
            display: flex;
            flex-direction: column;
            flex-flow: column;
            flex-grow: 1;
            border: 1px solid var(--black);
          }

          nav {
            display: flex;
            flex: 0 1 auto;
            padding: 0.5rem;
            background: var(--contrast-dark);
          }

          button {
            cursor: pointer;
            color: var(--white);
            background: var(--black-medium);
            border: 1px solid var(--black-light);
            padding: 0.25rem 0.5rem;
            font-size: 13px;
            transition: color 300ms ease;
          }

          button.active,
          button:hover {
            color: var(--theme);
          }

          :global(.dark) button {
            background: var(--black);
          }

          .btn-group {
            margin-left: auto;
          }

          .btn-group:after {
            content: '';
            clear: both;
            display: table;
          }

          .btn-group button:not(:last-child) {
            border-right: none;
          }

          .container {
            display: flex;
            flex: 1;
            min-height: 0;
          }

          section {
            overflow: scroll;
            width: 50%;
            display: flex;
            flex-direction: column;
            min-height: 0;
          }

          .preview {
            color: var(--black);
            height: 100%;
            padding: 1.5rem;
          }

          .left,
          .right {
            position: relative;
          }

          .left :global(.CodeMirror),
          .left :global(.react-codemirror2) {
            color: white;
            background: var(--contrast-dark);
          }

          .left :global(.CodeMirror-lines) {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }
          .left :global(.CodeMirror-line) {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          .right :global(.CodeMirror),
          .right :global(.react-codemirror2) {
            color: white;
            background: var(--black-medium);
          }

          .right :global(.CodeMirror) {
            color: white;
            border-left: 1px solid rgba(255, 255, 255, 0.22);
          }

          .right {
            background: var(--white);
          }

          .sandbox :global(.CodeMirror) {
            border-top: 1px solid rgba(255, 255, 255, 0.22);
          }

          .sandbox .preview :global(h1) {
            font-size: 29px;
            line-height: 52px;
            margin-top: 0rem;
          }

          .sandbox .preview :global(h2) {
            font-size: 18px;
            line-height: 26px;
            margin-top: 1rem;
          }

          .sandbox .preview :global(p) {
            font-size: var(--font-size-3);
            line-height: var(--line-height-3);
            font-weight: 400;
          }

          .sandbox .preview :global(.callout) {
            padding-top: 0.5rem;
          }

          .sandbox .preview :global(.callout p) {
            font-size: 14px;
            line-height: 20px;
          }
        `}
      </style>
    </div>
  );
}
