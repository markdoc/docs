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
          <span className="title">{title}</span>
          <span>{children}</span>
        </div>
      </div>
      <style jsx>
        {`
          .content {
            line-height: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.05),
                rgba(0, 0, 0, 0.05)
              ),
              linear-gradient(0deg, #ffffff, #ffffff);
          }
          .icon {
            padding-right: 8px;
            align-items: center;
          }
          .title {
            color: var(--dark);
          }
          .callout :global(p:first-of-type) {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}
