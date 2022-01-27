import * as React from 'react';
import Script from 'next/script';

export function Icon({icon, color}) {
  return (
    <span>
      <ion-icon name={icon} />
      <style jsx>
        {`
          span {
            display: inline-block;
            position: relative;
            top: +2px;
            color: ${color};
            font-size: inherit;
            min-width: 16px;
          }
        `}
      </style>
    </span>
  );
}
