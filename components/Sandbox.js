import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import yaml from 'js-yaml';
import { useRouter } from 'next/router';
import Markdoc from '@markdoc/markdoc';
import { transformSchema } from '@markdoc/next.js/runtime';

import * as schema from '../markdoc';

const INITIAL_CODE = `---
title: Sandbox
---

# {% $markdoc.frontmatter.title %} {% #overview %} {% .h2 %} 

{% callout type="check" %}
Learn more about using the [Dashboard](http://dashboard.stripe.com) to operate your Stripe account.
{% /callout %}

The Stripe Dashboard is a feature-rich user interface for you to operate and configure your Stripe account. You can use it to manage payments and refunds, respond to disputes, monitor your integration, and more.

The Dashboard home page provides useful at-a-glance information about the activity on your account. A wide range of analytics and real-time charts provide insight into the performance of your business. The Dashboard also shows recent activity that may require you to take action, such as unanswered disputes or identity verifications.

## Navigating the Dashboard {% #navigation %} {% .h3 %} 

The Dashboard is primarily organized into separate sections. Each section represents a particular area of the API (e.g., [Payments](http://dashboard.stripe.com/payments) represents [Charge](https://stripe.com/docs/api#charge_object) objects that have been created) or functionality provided by Stripe (e.g., [Stripe Sigma](/sigma)).
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
        }
      },
      components
    };
  }, [ast]);

  const content = React.useMemo(
    () => Markdoc.process(ast, config),
    [ast, config]
  );

  return { ast, content, config };
}

const options = {
  mode: 'markdown',
  lineWrapping: true,
  lineNumbers: true,
  theme: 'none'
};

export function Editor({ innerRef, code, onChange }) {
  const [key, setKey] = React.useState(0);

  const onBeforeChange = React.useCallback(
    (editor, meta, code) => onChange(code),
    [onChange]
  );

  React.useEffect(() => {
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

const activeBtn = { background: 'rgba(255, 255, 255, 0.84)' };

export function Sandbox() {
  const router = useRouter();
  const ref = React.useRef();
  const [code, setCode] = React.useState(INITIAL_CODE);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const { ast, content, config } = useMarkdocCode(code);

  const mode = router.query.mode || 'preview';

  function setMode(newMode) {
    router.query.mode = newMode;
    router.replace(router, undefined, { scroll: false });
  }

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
          {/* Codemirror doesn't work w/ SSR */}
          {mounted ? (
            <Editor innerRef={ref} code={code} onChange={setCode} />
          ) : null}
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
