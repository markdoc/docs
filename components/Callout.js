import * as React from 'react';

import {Icon} from './Icon';

const ICON_MAP = {
  note: 'information-circle',
  caution: 'warning',
  check: 'checkmark-circle',
  warning: 'warning',
};

export function Callout({title, children, type}) {
  const icon = ICON_MAP[type];

  return (
    <div className="callout">
      <div className={`content ${type}`}>
        <div className="icon">
          <Icon icon={icon} type={type} />
        </div>
        <div className="copy">
          <span className="title">{title}</span>
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}

Callout.displayName = 'Callout';
