import React from 'react';
import Link from 'next/link';

export default function TableOfContents({ toc }) {
  const items = toc.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );
  return (
    <nav className="toc">
      {items.length > 1 ? (
        <ul>
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
