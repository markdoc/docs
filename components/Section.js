import * as React from 'react';

export function Section({ children, background }) {
  return (
    <section className={`section section-background--${background}`}>
      <div className="contents">{children}</div>
    </section>
  );
}
