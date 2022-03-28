import * as React from 'react';

import { Icon } from './Icon';

const TYPE_MAP = {
  note: {
    icon: 'information-circle',
    iconColor: '#8792a2',
    background: '#f7fafc'
  },
  caution: {
    icon: 'warning',
    iconColor: '#d97917',
    background: '#fcf9e9'
  },
  check: {
    icon: 'checkmark-circle',
    iconColor: 'var(--theme)',
    background:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), linear-gradient(0deg, #FFFFFF, #FFFFFF)'
  },
  warning: {
    icon: 'warning',
    iconColor: '#ed5f74',
    background: '#fff8f5'
  }
};

export function Callout({ title, children, type }) {
  const { icon, iconColor, background } = TYPE_MAP[type];

  return (
    <p className="callout">
      <div
        className="flex"
        style={{
          lineHeight: '20px',
          padding: '12px 20px',
          borderRadius: 'var(--radii-1)',
          background
        }}
      >
        <div style={{ paddingRight: 8 }}>
          <Icon icon={icon} color={iconColor} />
        </div>
        <div className="flex column">
          <span style={{ color: 'var(--dark)' }}>{title}</span>
          <span>{children}</span>
        </div>
      </div>
    </p>
  );
}
