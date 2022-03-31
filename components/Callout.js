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
  const { icon, iconColor } = TYPE_MAP[type];

  return (
    <div className="callout">
      <div
        className="flex"
        style={{
          lineHeight: '20px',
          padding: '12px 20px',
          borderRadius: 'var(--radii-1)',
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), linear-gradient(0deg, #FFFFFF, #FFFFFF)'
        }}
      >
        <div className="flex" style={{ paddingRight: 8, alignItems: 'center' }}>
          <Icon icon={icon} color={iconColor} />
        </div>
        <div className="flex column">
          <span style={{ color: 'var(--dark)' }}>{title}</span>
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}
