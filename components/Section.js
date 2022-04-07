import * as React from 'react';

export function Section({ children, background }) {
  return (
    <section className="section">
      <div>{children}</div>
      <style jsx>
        {`
          section {
            width: 100%;
            background: ${background || 'var(--light)'};
          }
          div {
            padding: 5rem 0;
            margin: 0 auto;
            max-width: var(--landing-page-max-width);
          }
          @media screen and (max-width: 420px) {
            div {
              padding: 4rem 0;
            }
          }
        `}
      </style>
    </section>
  );
}
