import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Get started',
    links: [
      {href: '/docs/getting-started', children: 'Installation'},
      {href: '/docs/basic-usage', children: 'Basic usage'},
    ],
  },
  {
    title: 'Syntax',
    links: [
      {href: '/docs/syntax', children: 'Overview'},
      {href: '/sandbox', children: 'Try it out (Demo)'},
    ],
  },
  {
    title: 'Schema',
    links: [
      {href: '/docs/nodes', children: 'Nodes'},
      {href: '/docs/tags', children: 'Tags'},
      {href: '/docs/functions', children: 'Functions'},
      {href: '/docs/variables', children: 'Variables'},
    ],
  },
  {
    title: 'Rendering',
    links: [
      {
        href: '/docs/rendering/overview',
        children: 'Phases of rendering',
        links: [
          'parse',
          'process',
          // TODO delete
          'expand',
          'render',
          'validate',
        ].map((key) => ({
          href: '/docs/rendering/phases#' + key,
          children: <code>{key}</code>,
        })),
      },
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
