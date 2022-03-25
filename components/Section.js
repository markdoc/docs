import * as React from 'react';

export function Section({ children, background }) {
  return (
    <section
      className="section full-width"
      style={{ background: background || 'var(--light)' }}
    >
      <div
        style={{
          padding: '5rem 0',
          margin: '0 auto',
          maxWidth: 'var(--landing-page-max-width)'
        }}
      >
        {children}
      </div>
    </section>
  );
}
