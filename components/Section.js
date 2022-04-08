import * as React from 'react';

export function Section({ children, background }) {
  return (
    <div className="section">
      <section>{children}</section>
      <style jsx>
        {`
          div {
            width: 100%;
            background: ${background || 'var(--light)'};
          }
          section {
            padding: 4rem 0 5rem;
            margin: 0 auto;
            max-width: var(--landing-page-max-width);
          }
          @media screen and (max-width: 420px) {
            section {
              padding: 4rem 0;
            }
          }
        `}
      </style>
    </div>
  );
}
