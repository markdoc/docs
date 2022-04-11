import React from 'react';

export function Features({ children }) {
  return (
    <div className="features">
      {children}
      <style jsx>
        {`
          .features :global(ul) {
            display: flex;
            padding: 0;
          }

          .features :global(li) {
            list-style: none;
            flex: 1 1 0px;
            margin-right: 3rem;
          }

          .features :global(p) {
            font-size: var(--font-size-3);
            line-height: var(--line-height-3);
          }

          .features :global(li strong) {
            font-family: var(--decoration);
            font-size: 14px;
            font-weight: 600;
            line-height: 27px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .features :global(li *:last-child a) {
            font-size: 15px;
            line-height: 27px;
          }

          @media screen and (max-width: 420px) {
            .features :global(ul) {
              flex-direction: column;
            }
            .features :global(li) {
              padding-bottom: 3rem;
            }
          }
        `}
      </style>
    </div>
  );
}
