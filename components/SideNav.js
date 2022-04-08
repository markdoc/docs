import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Get started',
    links: [
      { href: '/docs/overview', children: 'Overview' },
      { href: '/docs/getting-started', children: 'Installation' }
    ]
  },
  {
    title: 'Syntax and schema',
    links: [
      { href: '/docs/syntax', children: 'Overview' },
      { href: '/docs/nodes', children: 'Nodes' },
      { href: '/docs/tags', children: 'Tags' },
      { href: '/docs/attributes', children: 'Attributes' },
      { href: '/docs/variables', children: 'Variables' },
      { href: '/docs/functions', children: 'Functions' },
      { href: '/docs/validation', children: 'Validation' }
    ]
  },
  {
    title: 'Rendering',
    links: [
      {
        href: '/docs/rendering',
        children: 'Overview'
      },
      { href: '/docs/rendering/html', children: 'HTML' },
      { href: '/docs/rendering/react', children: 'React' }
    ]
  },
  {
    title: 'Advanced concepts',
    links: [
      { href: '/docs/frontmatter', children: 'Frontmatter' },
      { href: '/docs/partials', children: 'Partials' }
    ]
  },
  {
    title: 'Integration guides',
    links: [
      { href: '/docs/examples', children: 'Common examples' },
      { href: '/docs/nextjs', children: 'Using with Next.js' }
    ]
  }
];

export function SideNav() {
  const router = useRouter();

  return (
    <nav className="sidenav no-mobile">
      {items.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <ul className="flex column">
            {item.links.map((link) => {
              const active = router.pathname === link.href;
              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link {...link}>
                    <a href={link.href}>{link.children}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: var(--nav-height);
            height: calc(100vh - var(--nav-height));
            flex: 0 0 240px;
            overflow-y: auto;
            padding: 2rem 0 3rem 2rem;
          }
          h3 {
            font-weight: 500;
            margin: 0.5rem 0 0;
            padding-bottom: 0.5rem;
          }
          ul {
            margin: 0;
            padding: 4px 0 0;
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
          li.active > a {
            text-decoration: underline;
          }
        `}
      </style>
    </nav>
  );
}
