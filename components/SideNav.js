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
    <nav className="side-nav">
      {items.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <ul>
            {item.links.map((link) => {
              const active = router.asPath === link.href;
              return (
                <li key={link.href} className={active ? 'active' : undefined}>
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
      <style jsx>{`
        nav {
          --shadow-height: 14px;
          position: sticky;
          top: var(--nav-height);
          height: calc(100vh - var(--nav-height));
          flex: 0 0 240px;
          overflow-y: auto;
          padding-top: 2rem;
          padding-bottom: 3rem;
          padding-left: 2rem;

          /* https://stackoverflow.com/questions/44793453/how-do-i-add-a-top-and-bottom-shadow-while-scrolling-but-only-when-needed */
          background: linear-gradient(white 30%, rgba(255, 255, 255, 0)),
            linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
            radial-gradient(
                farthest-side at 50% 100%,
                rgba(0, 0, 0, 0.2),
                rgba(0, 0, 0, 0)
              )
              0 100%;
          background-repeat: no-repeat;
          background-color: white;
          background-size: 100% 40px, 100% 40px, 100% var(--shadow-height);
          background-attachment: local, local, scroll, scroll;
        }

        h3 {
          color: #333333;
          font-weight: 500;
          margin: 1rem 0 0.5rem;
        }

        ul {
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 4px 0 0;
        }

        li {
          list-style-type: none;
          margin-left: 1.5rem;
          font-size: 14px;
          font-weight: 400;
          padding-bottom: 0.75rem;
        }

        li:hover,
        li.active {
          color: var(--theme);
        }
      `}</style>
    </nav>
  );
}
