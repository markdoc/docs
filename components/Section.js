import * as React from 'react';

export function Section({ children, background }) {
  return (
    <section className="section full-width">
      <div>{children}</div>
      <style jsx>
        {`
          section {
            background: ${background || 'var(--light)'};
          }
          div {
            padding: 5rem 0;
            margin: 0 auto;
            max-width: var(--landing-page-max-width);
          }
        `}
      </style>
    </section>
  );
}
