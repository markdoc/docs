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
    <nav
      className="toc"
      style={{
        position: 'sticky',
        top: '96px',
        maxHeight: 'calc(100vh - var(--nav-height))',
        flex: '0 0 240px',
        alignSelf: 'flex-start',
        margin: '2rem 0 0 1rem',
        padding: '0.25rem 0 0',
        borderLeft: '1px solid var(--gray-2)'
      }}
    >
      {items.length > 1 ? (
        <ul
          className="flex column"
          style={{
            margin: 0,
            padding: 0
          }}
        >
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
    </nav>
  );
}
