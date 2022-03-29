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
        className="flex column equal-width"
        style={{
          paddingTop: '0.75rem',
          paddingRight: '3rem',
          borderRight: '1px solid var(--side-by-side-border)'
        }}
      >
        {first}
      </div>
      <div
        className="flex column equal-width"
        style={{ paddingTop: '0.75rem', paddingLeft: '3rem' }}
      >
        {rest}
      </div>
    </div>
  );
}
