import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import yaml from 'js-yaml';
import { useRouter } from 'next/router';
import Markdoc from '@markdoc/markdoc';
import { transformSchema } from '@markdoc/next.js/runtime';

import { Editor } from '../components/Editor';

import * as schema from '../markdoc';

const INITIAL_CODE = `---
title: Sandbox
---

# {% $markdoc.frontmatter.title %} {% #overview %}

{% callout type="check" %}
Learn about using the [Dashboard](http://dashboard.stripe.com) to operate your Stripe account.
{% /callout %}

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

---

## Next steps {% #next-steps %}

Read on to learn more about the Dashboard:

* [Teams and user roles]()
* [Dashboard reporting]()
* [Performing searches in the Dashboard]()
* [Managing your account]()
`;

export function Sandbox() {
  const [code, setCode] = React.useState(INITIAL_CODE);
  const router = useRouter();
  const mode = router.query.mode || 'preview';

  function setMode(newMode) {
    router.query.mode = newMode;
    router.replace(router);
  }

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
            : {},
        },
      },
      components,
    };
  }, [ast]);

  const content = React.useMemo(
    () => Markdoc.process(ast, config),
    [ast, config]
  );

  const activeBtn = { background: '#e1e1e1' };

  return (
    <div className="sandbox">
      <nav>
        <button onClick={() => setCode('')}>Clear</button>
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
          <Editor code={code} onChange={setCode} />
        </section>
        <section>
          {mode === 'preview' && (
            <div className="preview">
              {Markdoc.render(code, config, 'react', React, {
                components: config.components,
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
              options={{ mode: 'xml', lineWrapping: true }}
            />
          )}
          {mode === 'process' && (
            <CodeMirror
              value={JSON.stringify(content, null, 2)}
              options={{ mode: 'application/json', lineWrapping: true }}
            />
          )}
          {mode === 'ast' && (
            <CodeMirror
              value={JSON.stringify(ast, null, 2)}
              options={{ mode: 'application/json', lineWrapping: true }}
            />
          )}
        </section>
      </div>
    </div>
  );
}
