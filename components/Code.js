import * as React from 'react';
import PrismCode from 'react-prism';
import copy from 'copy-to-clipboard';

import {Icon} from './Icon';

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
    <div className="code">
      <PrismCode
        ref={ref}
        key={language}
        component="pre"
        className={`language-${language}`}
      >
        {children}
      </PrismCode>
      <button className="btn" onClick={() => setCopied(true)}>
        <Icon icon={copied ? 'checkmark' : 'copy-outline'} />
      </button>
    </div>
  );
}

Code.displayName = 'Code';
