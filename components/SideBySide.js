import * as React from 'react';

export function SideBySide({ children }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div className="side-by-side flex row">
      <div className="left flex column equal-width">{first}</div>
      <div className="right flex column equal-width">{rest}</div>
      <style jsx>
        {`
          .side-by-side {
            width: 100%;
            padding: 0;
            margin-top: 1rem;
            border-radius: 4px;
          }
          .column {
            overflow: auto;
          }
          .left {
            padding-top: 0.75rem;
            padding-right: 3rem;
            border-right: 1px solid rgba(0, 0, 0, 0.14);
          }
          :global(body.dark) .left {
            border-color: var(--black-light);
          }
          .right {
            padding-top: 0.75rem;
            padding-left: 3rem;
          }
          .side-by-side :global(.heading) {
            margin: 0;
          }
          @media screen and (max-width: 1000px) {
            .side-by-side {
              flex-direction: column;
            }
            .left {
              padding: 0;
            }
            .right {
              padding-top: 1rem;
              padding-left: 0rem;
            }
          }
        `}
      </style>
    </div>
  );
}
