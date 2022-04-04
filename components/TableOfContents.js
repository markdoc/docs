import React from 'react';
import Link from 'next/link';

export function TableOfContents({ toc }) {
  const items = toc.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );
  return (
    <nav className="toc">
      {items.length > 1 ? (
        <ul className="flex column">
          {items.map((item) => {
            const href = `#${item.id}`;
            const active =
              typeof window !== 'undefined' && window.location.hash === href;
            return (
              <li
                key={item.title}
                className={[
                  active ? 'active' : undefined,
                  item.level === 3 ? 'padded' : undefined
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <Link href={href} passHref>
                  <a>{item.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: 96px;
            max-height: calc(100vh - var(--nav-height));
            flex: 0 0 240px;
            align-self: flex-start;
            margin: 2rem 0 0 1rem;
            padding: 0.25rem 0 0;
            border-left: 1px solid var(--gray-2);
          }
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style-type: none;
            margin: 0 0 1rem 1.5rem;
            font-size: 14px;
            font-weight: 400;
          }
          li a {
            text-decoration: none;
          }
          li a:hover,
          li.active a {
            text-decoration: underline;
          }
          li.padded {
            padding-left: 1rem;
          }
        `}
      </style>
    </nav>
  );
}
