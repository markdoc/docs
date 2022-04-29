import * as React from 'react';

export function Heading({ id = '', level = 1, children, className }) {
  const Component = `h${level}`;
  return (
    <a href={level === 1 ? '' : `#${id}`}>
      <Component className={['heading', className].filter(Boolean).join(' ')}>
        <div id={id} />
        {children}
      </Component>
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
          a:hover {
            opacity: 1;
          }
          div {
            position: absolute;
            top: calc(-1 * (var(--nav-height) + 44px));
          }
        `}
      </style>
    </a>
  );
}
