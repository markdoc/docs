import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Getting started',
    links: [
      {href: '/docs/getting-started', children: 'Installation'},
      {href: '/docs/basic-usage', children: 'Basic usage'},
    ],
  },
  {
    title: 'Syntax',
    links: [
      {href: '/docs/syntax', children: 'Overview'},
      {href: '/sandbox', children: 'Sandbox'},
    ],
  },
  {
    title: 'Schema definitions',
    links: [
      {href: '/docs/schema/tags', children: 'Tags'},
      {href: '/docs/schema/nodes', children: 'Nodes'},
      {href: '/docs/schema/functions', children: 'Functions'},
      {href: '/docs/schema/variables', children: 'Variables'},
    ],
  },
  {
    title: 'Rendering',
    links: [
      {href: '/docs/rendering/phases', children: 'Phases of rendering'},
      {href: '/docs/rendering/html', children: 'HTML'},
      {href: '/docs/rendering/react', children: 'React'},
      {href: '/docs/rendering/static-react', children: 'Static React'},
      {href: '/docs/rendering/markdoc', children: 'Markdoc text'},
    ],
  },
  {
    title: 'React',
    links: [
      {href: '/docs/react/components', children: 'Creating a component'},
      {href: '/docs/react/examples', children: 'Examples'},
    ],
  },
  {
    title: 'Integration guides',
    links: [{href: '/docs/nextjs', children: 'Next.js'}],
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
          padding-top: 28px;
          padding-bottom: 3rem;
        }

        h3 {
          color: #333333;
          font-weight: 500;
          margin: 1rem 0 0.75rem;
        }

        ul {
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
        }

        li {
          list-style-type: none;
          margin-left: 1.5rem;
          font-size: 14px;
          font-weight: 400;
          padding-bottom: 0.75rem;
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
