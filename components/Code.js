/* global Prism */
import 'prismjs';

import * as React from 'react';
import PrismCode from 'react-prism';
import copy from 'copy-to-clipboard';

import { Icon } from './Icon';

Prism.languages.markdoc = {
  tag: {
    pattern: /{%(.|\n)*?%}/i,
    inside: {
      tagType: {
        pattern: /^({%\s*\/?)(\w*|-)* /i,
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
      punctuation: /({%|\/?%})/i
    }
  },
  variable: {
    pattern: /\$\w+/i
  },
  function: {
    pattern: /\b\w+(?=\()/i
  }
};

export function Code({ children, language }) {
  const [copied, setCopied] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (copied) {
      copy(ref.current._domNode.innerText);
      const to = setTimeout(setCopied, 1000, false);
      return () => clearTimeout(to);
    }
  }, [copied]);

  const lang = language === 'md' ? 'markdoc' : language || 'markdoc';

  const lines =
    typeof children === 'string' ? children.split('\n').filter(Boolean) : [];

  return (
    <div className="code" aria-live="polite" style={{ position: 'relative' }}>
      <PrismCode
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
        component="pre"
        className={`language-${lang}`}
      >
        {children}
      </PrismCode>
      <button
        style={{
          appearance: 'none',
          position: 'absolute',
          color: 'inherit',
          background: 'var(--code-background)',
          top: 0,
          right: 0,
          padding: `${lines.length === 1 ? '17px' : '12px'} 12px 0 0`,
          border: 'none',
          fontSize: '20px'
        }}
        onClick={() => setCopied(true)}
      >
        <title>{copied ? 'Copied' : 'Copy'}</title>
        <Icon icon={copied ? 'checkmark' : 'copy-outline'} />
      </button>
    </div>
  );
}
