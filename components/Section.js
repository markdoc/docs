import * as React from 'react';

export function Section({ children, background }) {
  return (
    <section
      className="section full-width"
      style={{ padding: '1rem 0 3rem', marginBottom: '1rem', background }}
    >
      <div style={{ margin: '0 auto', maxWidth: '1200px' }}>{children}</div>
    </section>
  );
}
