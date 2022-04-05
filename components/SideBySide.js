import * as React from 'react';

export function SideBySide({ children }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div className="side-by-side flex row full-width">
      <div className="left flex column equal-width">{first}</div>
      <div className="right flex column equal-width">{rest}</div>
      <style jsx>
        {`
          .side-by-side {
            padding: 0;
            margin-top: 1.5rem;
            border-radius: 4px;
          }
          .left {
            padding-top: 0.75rem;
            padding-right: 3rem;
            border-right: 1px solid var(--dark);
          }
          .right {
            padding-top: 0.75rem;
            padding-left: 3rem;
          }
          .side-by-side :global(.heading) {
            margin: 0;
          }

          @media screen and (max-width: 420px) {
            .side-by-side {
              flex-direction: column;
            }
            .left {
              padding: 0;
            }
            .right {
              padding-top: 3rem;
              padding-left: 0rem;
            }
          }
        `}
      </style>
    </div>
  );
}
