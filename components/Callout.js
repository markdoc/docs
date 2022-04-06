import * as React from 'react';

import { Icon } from './Icon';

const TYPE_MAP = {
  note: {
    icon: 'information-circle',
    iconColor: '#8792a2'
  },
  caution: {
    icon: 'warning',
    iconColor: '#d97917'
  },
  check: {
    icon: 'checkmark-circle',
    iconColor: 'var(--theme)'
  },
  warning: {
    icon: 'warning',
    iconColor: '#ed5f74'
  }
};

export function Callout({ title, children, type }) {
  const { icon, iconColor } = TYPE_MAP[type] || TYPE_MAP.note;

  return (
    <div className="callout">
      <div className="flex content">
        <div className="flex icon">
          <Icon icon={icon} color={iconColor} />
        </div>
        <div className="flex column">
          <strong>{title}</strong>
          <span>{children}</span>
        </div>
      </div>
      <style jsx>
        {`
          .content {
            color: var(--black);
            line-height: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            border: 1px solid var(--gray-medium);
            background: linear-gradient(0deg, var(--gray-3), var(--gray-3)),
              linear-gradient(0deg, #ffffff, #ffffff);
          }
          .icon {
            padding-right: 8px;
            align-items: center;
          }
          .callout :global(p:first-of-type) {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}
