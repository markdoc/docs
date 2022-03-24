import * as React from 'react';

export function Section({ children, background }) {
  return (
    <section className="section" style={{ background }}>
      <div className="contents">{children}</div>
    </section>
  );
}
