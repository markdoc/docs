import * as React from 'react';

export function Icon({icon, type}) {
  return (
    <span className={['icon', type].join(' ')}>
      <ion-icon name={icon} />
    </span>
  );
}

Icon.displayName = 'Icon';
