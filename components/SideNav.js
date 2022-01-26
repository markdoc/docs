import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Getting started',
    links: [{href: '/docs/getting-started', children: 'Overview'}],
  },
];

export default function SideNav() {
  const router = useRouter();

  return (
    <nav className="side-nav">
      {items.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <ul>
            {item.links.map((link) => (
              <li
                key={link.href}
                className={link.href === router.asPath ? 'active' : undefined}
              >
                <Link {...link} />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <style jsx>{`
        nav {
          position: sticky;
          top: var(--nav-height);
          height: calc(100vh - var(--nav-height));
          flex: 0 0 240px;
          overflow-y: auto;
          padding-top: 26px;
        }

        ul {
          display: flex;
          margin: 0;
          padding: 0;
        }

        li {
          list-style-type: none;
          margin-left: 1.5rem;
          font-size: 16px;
          font-weight: 400;
          color: var(--gray-1);
        }

        li:hover,
        li.active {
          color: var(--theme);
        }
      `}</style>
    </nav>
  );
}
