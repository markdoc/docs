import React from 'react';
import Link from 'next/link';

export default function TableOfContents({toc}) {
  const items = toc.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );
  return (
    <nav>
      {items.length > 1 ? (
        <ul>
          {items.map((item) => {
            const href = `#${item.id}`;
            const active =
              typeof window !== 'undefined' && window.location.hash === href;
            return (
              <li
                key={item.title}
                className={active ? 'active' : undefined}
                style={{paddingLeft: item.level === 3 ? '1rem' : undefined}}
              >
                <Link href={href} passHref>
                  <a>{item.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      <style jsx>{`
        nav {
          position: sticky;
          top: 96px;
          max-height: calc(100vh - var(--nav-height));
          flex: 0 0 240px;
          align-self: flex-start;
          margin: 2rem 0 0 3rem;
          padding: 0.25rem 0 0;
          border-left: 1px solid var(--gray-2);
        }

        ul {
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
        }

        li {
          list-style-type: none;
          margin-left: 1rem;
          font-size: 14px;
          font-weight: 400;
          padding-bottom: 0.75rem;
        }

        li a {
          color: var(--text);
        }

        li:hover a,
        li.active a {
          color: var(--theme);
        }
      `}</style>
    </nav>
  );
}
