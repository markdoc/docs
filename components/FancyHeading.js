import React from 'react';

function Cover({ top, left, bottom, right }) {
  return (
    <div>
      <style jsx>
        {`
          div {
            position: absolute;
            width: 10px;
            height: 10px;
            background: var(--contrast-gray);
            top: ${top}px;
            left: ${left}px;
            bottom: ${bottom}px;
            right: ${right}px;
          }
        `}
      </style>
    </div>
  );
}

export function FancyHeading({ title, children }) {
  return (
    <div className="flex center-vertical">
      <Cover top={-5} left={-5} />
      <Cover bottom={-5} left={-5} />
      <Cover top={-5} right={-5} />
      <Cover bottom={-5} right={-5} />
      <h2>{title}</h2>
      {children}
      <style jsx>
        {`
          .center-vertical {
            position: relative;
            padding: 3rem 4rem;
            border-color: var(--dark);
            border-width: 1px 1px 2px;
            border-style: solid solid dashed;
          }
          h2 {
            font-family: var(--serif);
            font-size: 43px;
            font-weight: 400;
            line-height: 49px;
            margin-top: 0;
            padding-right: 3rem;
            white-space: nowrap;
          }
        `}
      </style>
    </div>
  );
}
