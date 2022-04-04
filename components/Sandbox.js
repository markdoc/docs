import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import yaml from 'js-yaml';
import Markdoc from '@markdoc/markdoc';
import { transformSchema } from '@markdoc/next.js/runtime';
import prettify from 'diffable-html';

import * as schema from '../markdoc';

const INITIAL_CODE = `---
title: What is Markdoc?
---

# {% $markdoc.frontmatter.title %} {% #overview %} {% .h2 %} 

Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites.  
Stripe created Markdoc to power [our public docs](http://stripe.com/docs), replacing [ERB](https://docs.ruby-lang.org/en/2.3.0/ERB.html).

{% callout type="check" %}
Markdoc is open-source—check out it's [source](http://github.com/markdoc/markdoc) to see how it works.
{% /callout %}

## Frequently asked questions

### What is the difference between Markdoc and MDX?

Markdoc uses a fully declarative approach to composition and flow control, where MDX relies on…  
[Read more&nbsp;→](/docs/overview)

## Next steps

- [Install Markdoc](/docs/getting-started)
- [Try it out online](/sandbox)
`;

export function useMarkdocCode(code) {
  const ast = React.useMemo(() => Markdoc.parse(code), [code]);

  const config = React.useMemo(() => {
    const { nodes, tags, components } = transformSchema(schema);
    return {
      nodes,
      tags,
      variables: {
        markdoc: {
          frontmatter: ast.attributes.frontmatter
            ? yaml.load(ast.attributes.frontmatter)
            : {}
        },
        invalid_code: `\n{% callout %}\nHere!\n`
      },
      components,
      functions: {
        upper: {
          render(parameters) {
            const string = parameters['0'];

            return typeof string === 'string' ? string.toUpperCase() : string;
          }
        }
      }
    };
  }, [ast]);

  const content = React.useMemo(
    () => Markdoc.process(ast, config),
    [ast, config]
  );

  const errors = React.useMemo(
    () => Markdoc.validate(ast, config),
    [ast, config]
  );

  return { ast, content, config, errors };
}

const options = {
  mode: 'markdown',
  lineWrapping: true,
  lineNumbers: true,
  theme: 'none'
};

function EditorInternal({ innerRef, code, onChange }) {
  const [key, setKey] = React.useState(0);

  const onBeforeChange = React.useCallback(
    (editor, meta, code) => onChange(code),
    [onChange]
  );

  React.useLayoutEffect(() => {
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/xml/xml');
    setKey((k) => k + 1);
  }, []);

  return (
    <CodeMirror
      ref={innerRef}
      key={key}
      value={code}
      options={options}
      onBeforeChange={onBeforeChange}
    />
  );
}

export function Editor(props) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Codemirror doesn't work w/ SSR
  return mounted ? <EditorInternal {...props} /> : null;
}

export function Sandbox({ height }) {
  const ref = React.useRef();
  const [code, setCode] = React.useState(INITIAL_CODE);
  const [mode, setMode] = React.useState('preview');

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

  return (
    <div className="sandbox">
      <nav>
        <button
          onClick={() => {
            setCode('');
            ref.current.editor.focus();
          }}
        >
          Clear
        </button>
        <div className="btn-group">
          <button
            className={mode === 'preview' ? 'active' : undefined}
            onClick={() => setMode('preview')}
          >
            Preview
          </button>
          <button
            className={mode === 'html' ? 'active' : undefined}
            onClick={() => setMode('html')}
          >
            HTML
          </button>
          <button
            className={mode === 'process' ? 'active' : undefined}
            onClick={() => setMode('process')}
          >
            Render tree
          </button>
          <button
            className={mode === 'ast' ? 'active' : undefined}
            onClick={() => setMode('ast')}
          >
            AST
          </button>
        </div>
      </nav>
      <div className="flex container">
        <section className="left">
          <Editor innerRef={ref} code={code} onChange={setCode} />
        </section>
        <section className="right light">
          {mode === 'preview' && (
            <div className="preview">
              {Markdoc.render(code, config, 'react', React, {
                components: config.components
              })}
            </div>
          )}
          {mode === 'html' && (
            <CodeMirror
              value={prettify(
                Markdoc.render(code, { variables: config.variables }, 'html')
              )}
              options={{ mode: 'xml', lineWrapping: true, readOnly: true }}
            />
          )}
          {mode === 'process' && (
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
            padding: 0.5rem 2rem 0.5rem 30px;
            background: var(--contrast-dark);
          }

          button {
            cursor: pointer;
            background: var(--white);
            border: 1px solid var(--contrast-dark);
            padding: 0.25rem 0.5rem;
            margin-right: 1px;
          }

          button.active {
            background: rgba(255, 255, 255, 0.84);
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
            padding: 0 2rem 2rem;
          }

          .left :global(.CodeMirror),
          .left :global(.react-codemirror2) {
            color: white;
            background: var(--contrast-dark);
          }

          .left :global(.CodeMirror) {
            border-top: 1px solid rgba(255, 255, 255, 0.22);
          }

          .right {
            background: var(--white);
          }

          .sandbox :global(.syntax-error) {
            text-decoration: red wavy underline;
            text-decoration-skip-ink: none;
          }

          /* Tooltip */
          .sandbox :global(.syntax-error::before) {
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
          .sandbox :global(.syntax-error::after) {
            content: '';
            position: absolute;
            display: none;
            bottom: 12px;
            left: 12px;
            border-width: 4px;
            border-style: solid;
            border-color: var(--white) transparent transparent transparent;
          }

          .sandbox :global(.syntax-error:hover::before),
          .sandbox :global(.syntax-error:hover::after) {
            display: inline-block;
          }

          .sandbox .preview :global(h2) {
            margin-top: 1rem;
          }

          .sandbox .preview :global(h3) {
            margin-top: 0.75rem;
          }

          .sandbox .preview :global(p) {
            font-size: 13px;
            line-height: var(--line-height-3);
          }

          .sandbox .preview :global(.callout p) {
            line-height: 20px;
          }
        `}
      </style>
    </div>
  );
}
