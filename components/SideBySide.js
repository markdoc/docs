import * as React from 'react';

export function SideBySide({ children }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div
      className="flex row full-width side-by-side"
      style={{
        padding: 0,
        marginTop: '1.5rem',
        borderRadius: 'var(--radii-1)'
      }}
    >
      <div
        className="flex column"
        style={{
          flex: '1 1 0px',
          paddingRight: '1rem'
        }}
      >
        {first}
      </div>
      <div
        className="flex column"
        style={{
          flex: '1 1 0px',
          paddingLeft: '1rem'
          // minWidth: 200
        }}
      >
        {rest}
      </div>
    </div>
  );
}
