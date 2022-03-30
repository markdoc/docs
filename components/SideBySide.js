import * as React from 'react';

export function SideBySide({ children }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div
      className="side-by-side flex row full-width"
      style={{
        padding: 0,
        marginTop: '1.5rem',
        borderRadius: 'var(--radii-1)'
      }}
    >
      <div
        className="left flex column equal-width"
        style={{
          paddingTop: '0.75rem',
          paddingRight: '3rem'
        }}
      >
        {first}
      </div>
      <div
        className="right flex column equal-width"
        style={{ paddingTop: '0.75rem', paddingLeft: '3rem' }}
      >
        {rest}
      </div>
    </div>
  );
}
