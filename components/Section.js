import * as React from 'react';

// TODO use className for background here
export function Section({ children, className, background }) {
  return (
    <div className={['section', className].filter(Boolean).join(' ')}>
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
