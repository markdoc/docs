import * as React from 'react';
import Link from 'next/link';

export function TableOfContent() {
  const pages = [
    {
      title: 'Getting started',
      links: [{ href: '/docs/introduction', children: 'Introduction' }]
    },
    {
      title: 'See also',
      links: [{ href: '/docs/resources', children: 'Resources' }]
    }
  ];
  return (
    <nav className="nav">
      <ul>
        {pages.map((page, i) => (
          <li key={i} className="title">
            {page.title}
            <ul>
              {page.links.map((l, y) => (
                <li key={y}>
                  <Link href={l.href}>{l.children}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .nav {
          padding-top: 1em;
          border-right: 1px solid rgba(227, 232, 238, 1);
          grid-row: 2 / 4;
          grid-column: 1;
          position: sticky;
          left: 0;
        }
        ul {
          padding: 0;
        }
        li {
          list-style: none;
          margin: 1em;
        }
        li.title {
          font-weight: 700;
          color: #635bff;
          font-size: 16px;
        }
        li:not(.title) {
          font-weight: normal;
          font-size: 14px;
        }
      `}</style>
    </nav>
  );
}
