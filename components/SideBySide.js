import * as React from 'react';

export function SideBySide({ children, appearance }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div
      className="flex row full-width side-by-side"
      style={{
        padding: 0,
        marginTop: '1.5rem',
        borderRadius: 'var(--radii-1)',
        border: appearance === 'box' ? '1px solid var(--gray-2)' : undefined
      }}
    >
      <div
        className="flex column"
        style={{
          flex: '1 1 0px',
          padding: appearance === 'box' ? '1rem 2rem' : undefined,
          borderRight:
            appearance === 'box' ? '1px solid var(--gray-2)' : undefined
        }}
      >
        {first}
      </div>
      <div
        className="flex column"
        style={{
          flex: '1 1 0px',
          padding: appearance === 'box' ? '1.75rem 2rem' : undefined,
          minWidth: 200
        }}
      >
        {rest}
      </div>
    </div>
  );
}
