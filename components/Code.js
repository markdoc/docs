/* global Prism */
import 'prismjs';

import * as React from 'react';
import copy from 'copy-to-clipboard';

import { Icon } from './Icon';

Prism.languages.markdoc = {
  tag: {
    pattern: /{%(.|\n)*?%}/i,
    inside: {
      tagType: {
        pattern: /^({%\s*\/?)(\w*|-)*\b/i,
        lookbehind: true
      },
      id: /#(\w|-)*\b/,
      string: /".*?"/,
      equals: /=/,
      number: /\b\d+\b/i,
      variable: {
        pattern: /\$[\w.]+/i,
        inside: {
          punctuation: /\./i
        }
      },
      function: /\b\w+(?=\()/,
      punctuation: /({%|\/?%})/i,
      boolean: /false|true/
    }
  },
  variable: {
    pattern: /\$\w+/i
  },
  function: {
    pattern: /\b\w+(?=\()/i
  }
};

export function Code({ children, language, ...rest }) {
  const [copied, setCopied] = React.useState(false);
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current, false);
  }, []);

  React.useEffect(() => {
    if (copied) {
      copy(ref.current.innerText);
      const to = setTimeout(setCopied, 1000, false);
      return () => clearTimeout(to);
    }
  }, [copied]);

  const lang = language === 'md' ? 'markdoc' : language || 'markdoc';

  const lines =
    typeof children === 'string' ? children.split('\n').filter(Boolean) : [];

  return (
    <div className="code" aria-live="polite" data-line="3">
      <pre
        {...rest}
        /**
         * HACK: prevent "Uncaught DOMException" when typing
         *
         * ```
         * {% tag %} ← no closing tag
         * ```
         *
         * in the sandbox.
         */
        key={children}
        ref={ref}
        className={`language-${lang}`}
      >
        {children}
      </pre>
      <button onClick={() => setCopied(true)}>
        <title>{copied ? 'Copied' : 'Copy'}</title>
        <Icon icon={copied ? 'checkmark' : 'copy-outline'} />
      </button>
      <style jsx>
        {`
          .code {
            position: relative;
          }
          .code button {
            appearance: none;
            position: absolute;
            color: inherit;
            background: var(--code-background);
            top: 1px;
            right: 1px;
            border-radius: 4px;
            padding: ${lines.length === 1 ? '16px' : '12px'} 10px 0 0;
            border: none;
            font-size: 15px;
          }
        `}
      </style>
    </div>
  );
}
