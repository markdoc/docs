import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Get started',
    links: [
      { href: '/docs/getting-started', children: 'Installation' },
      { href: '/sandbox', children: 'Try it out' },
    ],
  },
  {
    title: 'Syntax and schema',
    links: [
      { href: '/docs/syntax', children: 'Overview' },
      { href: '/docs/nodes', children: 'Nodes' },
      { href: '/docs/tags', children: 'Tags' },
      { href: '/docs/variables', children: 'Variables' },
      { href: '/docs/functions', children: 'Functions' },
    ],
  },
  {
    title: 'Rendering',
    links: [
      {
        href: '/docs/rendering',
        children: 'Overview',
      },
      { href: '/docs/rendering/html', children: 'HTML' },
      { href: '/docs/rendering/react', children: 'React' },
    ],
  },
  {
    title: 'Integration guides',
    links: [
      { href: '/docs/examples', children: 'Common examples' },
      { href: '/docs/nextjs', children: 'Using with Next.js' },
    ],
  },
];

export default function SideNav() {
  const router = useRouter();

  return (
    <nav className="sidenav">
      {items.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <ul>
            {item.links.map((link) => {
              const active = router.asPath === link.href;
              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link {...link}>
                    <a href={link.href}>{link.children}</a>
                  </Link>
                  {active && link.links && (
                    <ul>
                      {link.links.map((link) => (
                        <li key={link.href}>
                          <Link {...link}>
                            <a href={link.href}>{link.children}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
