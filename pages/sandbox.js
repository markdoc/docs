import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import Markdoc from '@stripe-internal/markdoc';

const INITIAL_CODE = `---
title: Sandbox
---

# Dashboard Overview {% #dashboard-overview %}

Learn about using the [Dashboard](http://dashboard.stripe.com) to operate your Stripe account.

---

The Stripe Dashboard is a feature-rich user interface for you to operate and configure your Stripe account. You can use it to manage payments and refunds, respond to disputes, monitor your integration, and more.

The Dashboard home page provides useful at-a-glance information about the activity on your account. A wide range of analytics and real-time charts provide insight into the performance of your business. The Dashboard also shows recent activity that may require you to take action, such as unanswered disputes or identity verifications.

## Navigating the Dashboard {% #navigation %}

The Dashboard is primarily organized into separate sections. Each section represents a particular area of the API (e.g., [Payments](http://dashboard.stripe.com/payments) represents [Charge](https://stripe.com/docs/api#charge_object) objects that have been created) or functionality provided by Stripe (e.g., [Stripe Sigma](/sigma)).

In many cases, you can use the Dashboard to perform specific actions, such as refunding a payment or canceling a subscription, without needing to use the API---making the Dashboard a useful tool for running your business.

## Creating reports and searches {% #creating-reports-and-searches %}

All of your transactional data can be filtered and exported as [reports](https://stripe.com/docs/reports) in CSV format. You can also download a monthly report or QuickBooks-formatted export from your account's business settings.

## Browser compatibility {% #browser-compatibility %}

The Dashboard officially supports the following web browsers and mobile environments:

* Chrome versions greater than 49
* The last two versions of Firefox, Safari, and Edge
* The last two versions of mobile Safari on iOS
* Internet Explorer 11

## Next steps {% #next-steps %}

Read on to learn more about the Dashboard:

* [Teams and user roles](#TODO)
* [Dashboard reporting](#TODO)
* [Performing searches in the Dashboard](#TODO)
* [Managing your account](#TODO)
`;

const options = {
  mode: 'markdown',
  lineWrapping: true,
  lineNumbers: true,
};

export default function Sandbox() {
  const [k, setK] = React.useState(0);
  const [code, setCode] = React.useState(INITIAL_CODE);
  const [mode, setMode] = React.useState('preview');

  React.useEffect(() => {
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/xml/xml');
    setK((k) => k + 1);
  }, []);

  const ast = React.useMemo(() => {
    return Markdoc.parse(code);
  }, [code]);

  const content = React.useMemo(() => {
    const processed = Markdoc.process(ast, {});
    return Markdoc.expand(processed, {});
  }, [ast]);

  const onBeforeChange = React.useCallback(
    (editor, meta, code) => setCode(code),
    []
  );

  return (
    <main>
      <nav>
        <button onClick={() => setCode('')}>Clear</button>
        <div className="btn-group">
          <button onClick={() => setMode('preview')}>Preview</button>
          <button onClick={() => setMode('html')}>HTML</button>
          <button onClick={() => setMode('process')}>Render tree</button>
          <button onClick={() => setMode('ast')}>AST</button>
        </div>
      </nav>
      <div className="flex container">
        <section>
          <CodeMirror
            key={k}
            value={code}
            options={options}
            onBeforeChange={onBeforeChange}
          />
        </section>
        <section>
          {mode === 'preview' && (
            <div className="preview">
              {Markdoc.renderers.react(content, React, {
                components: {},
                variables: {},
              })}
            </div>
          )}
          {mode === 'html' && (
            <CodeMirror
              value={Markdoc.renderers.html(content)}
              options={{mode: 'xml', lineWrapping: true}}
            />
          )}
          {mode === 'process' && (
            <CodeMirror
              value={JSON.stringify(content, null, 2)}
              options={{mode: 'application/json', lineWrapping: true}}
            />
          )}
          {mode === 'ast' && (
            <CodeMirror
              value={JSON.stringify(ast, null, 2)}
              options={{mode: 'application/json', lineWrapping: true}}
            />
          )}
        </section>
      </div>
      <style jsx>
        {`
          main {
            padding-top: var(--nav-height);
            height: 100%;
            display: flex;
            flex-flow: column;
          }

          main :global(.CodeMirror),
          main :global(.react-codemirror2) {
            height: 100%;
            cursor: text;
          }

          nav {
            padding: 0.5rem 2rem 0.5rem 30px;
            background: #f8f8f8;
          }

          h1,
          nav {
            display: flex;
            flex: 0 1 auto;
          }

          nav button {
            border: 1px solid #dedede;
            padding: 0.25rem 0.5rem;
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
            border-top: 1px solid #dedede;
          }

          section {
            overflow: scroll;
            width: 50%;
            display: flex;
            flex-direction: column;
            min-height: 0;
          }

          section:nth-child(2) {
            border-left: 1px solid #dedede;
          }

          .preview {
            padding: 0 2rem;
            text-rendering: optimizeLegibility;
            font-size: 15px;
            line-height: 26px;
          }

          .preview :global(a) {
            color: #556cd6;
          }

          .preview :global(a) {
            color: #556cd6;
            text-decoration: none;
            font-weight: 500;
          }
        `}
      </style>
    </main>
  );
}
