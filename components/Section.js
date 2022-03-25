import * as React from 'react';

export function Section({ children, background }) {
  return (
    <section className="section full-width" style={{ background }}>
      <div
        style={{
          padding: '5rem 0 7.5rem',
          margin: '0 auto',
          maxWidth: 'var(--landing-page-max-width)'
        }}
      >
        {children}
      </div>
    </section>
  );
}
