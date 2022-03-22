import * as React from 'react';

export function SideBySide({ children }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div className="side-by-side">
      <div className="left">{first}</div>
      <div className="right column">{rest}</div>
    </div>
  );
}
