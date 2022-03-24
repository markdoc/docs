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
    iconColor: '#1ea672',
    background: '#efffed'
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
    <div className="callout">
      <div
        className="flex content"
        style={{
          lineHeight: '20px',
          padding: '12px 20px',
          borderRadius: 'var(--radii-1)',
          boxShadow: '0 0 0 1px var(--gray-2)',
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
    </div>
  );
}
