import * as React from 'react';

export function Heading({ id = '', level = 1, children, className }) {
  return React.createElement(
    `h${level}`,
    { className: ['heading', className].filter(Boolean).join(' ') },
    [
      React.createElement('div', {
        id,
        key: 'anchor',
        style: {
          position: 'absolute',
          top: 'calc(-1 * (var(--nav-height) + 44px))'
        }
      }),
      children
    ]
  );
}
