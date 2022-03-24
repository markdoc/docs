import * as React from 'react';

export function SideBySide({ children, border }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div className="side-by-side" style={{ border }}>
      <div className="left" style={{ border }}>
        {first}
      </div>
      <div className="right column">{rest}</div>
    </div>
  );
}
