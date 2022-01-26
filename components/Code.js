import * as React from 'react';
import PrismCode from 'react-prism';

import 'prismjs';
import 'prismjs/themes/prism.css';

export function Code(props) {
  const {children, language} = props;

  return (
    <PrismCode
      key={language}
      component="pre"
      className={`language-${language}`}
    >
      {children}
    </PrismCode>
  );
}
