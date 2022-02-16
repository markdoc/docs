import * as React from 'react';

export function Heading({ id = '', level = 1, children }) {
  return React.createElement(`h${level}`, { className: 'heading' }, [
    React.createElement('div', { id, key: 'anchor', className: 'anchor' }),
    children,
  ]);
}

Heading.displayName = 'Heading';
