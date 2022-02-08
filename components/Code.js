import * as React from 'react';
import PrismCode from 'react-prism';
import copy from 'copy-to-clipboard';

import {Icon} from './Icon';

import 'prismjs';
import 'prismjs/themes/prism.css';

export function Code({children, language}) {
  const [copied, setCopied] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (copied) {
      copy(ref.current._domNode.innerText);
      const to = setTimeout(setCopied, 1000, false);
      return () => clearTimeout(to);
    }
  }, [copied]);

  return (
    <div>
      <PrismCode
        ref={ref}
        key={language}
        component="pre"
        className={`language-${language}`}
      >
        {children}
      </PrismCode>
      <button onClick={() => setCopied(true)}>
        <Icon icon={copied ? 'checkmark' : 'copy-outline'} />
      </button>
      <style jsx>
        {`
          div {
            position: relative;
          }
          button {
            appearance: none;
            border: none;
            background: #f5f2f0;
            font-size: 20px;
            position: absolute;
            top: 15px;
            right: 8px;
          }
        `}
      </style>
    </div>
  );
}
