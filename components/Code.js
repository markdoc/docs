/* global Prism */
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

  return (
    <div className="code" aria-live="polite" style={{ position: 'relative' }}>
      <PrismCode
        ref={ref}
        key={lang}
        component="pre"
        className={`language-${lang}`}
      >
        {children}
      </PrismCode>
      <button
        style={{
          appearance: 'none',
          padding: 0,
          position: 'absolute',
          top: '12px',
          right: '12px',
          border: 'none',
          background: '#f5f2f0',
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
