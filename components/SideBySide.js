import * as React from 'react';

export function SideBySide({ children }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div className="side-by-side">
      {first}
      <div className="column">{rest}</div>
    </div>
  );
}
