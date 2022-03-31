import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import yaml from 'js-yaml';
import Markdoc from '@markdoc/markdoc';
import { transformSchema } from '@markdoc/next.js/runtime';

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
  const ast = React.useMemo(() => Markdoc.parse(code, 'sandbox.md'), [code]);

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
        }
      },
      components
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

const activeBtn = { background: 'rgba(255, 255, 255, 0.84)' };

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

      errors.forEach((error) => {
        const from = {
          line: error.location.start.line - 1,
          ch: error.location.start.character
        };
        const to = {
          line: error.location.end.line - 1,
          ch: error.location.end.character
        };

        markers.push(
          ref.current.editor.markText(from, to, {
            className: 'syntax-error',
            attributes: {
              'data-title': error.error.message
            }
          })
        );
      });

      return () => markers.forEach((mark) => mark.clear());
    }
  }, [errors]);

  return (
    <div className="sandbox" style={{ height }}>
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
            style={mode === 'preview' ? activeBtn : undefined}
            onClick={() => setMode('preview')}
          >
            Preview
          </button>
          <button
            style={mode === 'html' ? activeBtn : undefined}
            onClick={() => setMode('html')}
          >
            HTML
          </button>
          <button
            style={mode === 'process' ? activeBtn : undefined}
            onClick={() => setMode('process')}
          >
            Render tree
          </button>
          <button
            style={mode === 'ast' ? activeBtn : undefined}
            onClick={() => setMode('ast')}
          >
            AST
          </button>
        </div>
      </nav>
      <div className="flex container">
        <section>
          <Editor innerRef={ref} code={code} onChange={setCode} />
        </section>
        <section>
          {mode === 'preview' && (
            <div className="preview">
              {Markdoc.render(code, config, 'react', React, {
                components: config.components
              })}
            </div>
          )}
          {mode === 'html' && (
            <CodeMirror
              value={Markdoc.render(
                code,
                { variables: config.variables },
                'html'
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
    </div>
  );
}
