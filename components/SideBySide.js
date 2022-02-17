import * as React from 'react';
import PrismCode from 'react-prism';
import copy from 'copy-to-clipboard';

export function SideBySide({ children }) {
  return <div className="side-by-side">{children}</div>;
}
