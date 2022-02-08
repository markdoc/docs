import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

import Link from '../components/AppLink';
import SideNav from '../components/SideNav';
import TableOfContents from '../components/TableOfContents';

import '../public/globals.css';

function collectHeadings(node, sections = []) {
  if (node.name === 'Heading') {
    const title = node.children[0];
    const attributes = Object.fromEntries(
      node.attributes.map((a) => [a.name, a.value])
    );

    if (typeof title === 'string') {
      sections.push({
        ...attributes,
        title,
      });
    }
  }

  if (node.children) {
    node.children.forEach((child) => collectHeadings(child, sections));
  }

  return sections;
}

export default function MyApp(props) {
  const {Component, pageProps} = props;
  const {markdoc} = pageProps;

  let description = 'A Markdown-based authoring system';
  let title = `Markdoc | ${description}`;
  if (markdoc) {
    if (markdoc.frontmatter.title) {
      title = `Markdoc | ${markdoc.frontmatter.title}`;
    }
    if (markdoc.frontmatter.description) {
      description = markdoc.frontmatter.description;
    }
  }

  const toc = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : [];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      <div className="nav-bar">
        <nav>
          <Link href="/">
            <a>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Markdoc logo" width={100} height={45} />
            </a>
          </Link>
          <ul className="links">
            <li>
              <Link href="/docs/getting-started">Docs</Link>
            </li>
            <li>
              <Link href="/sandbox">Try</Link>
            </li>
            <li>
              <Link href="https://github.com/stripe-oss/markdoc/discussions">
                Community
              </Link>
            </li>
            <li>
              <Link href="https://github.com/stripe-oss/markdoc">GitHub</Link>
            </li>
            <li>
              <Link href="https://twitter.com/StripeDev">Twitter</Link>
            </li>
          </ul>
        </nav>
      </div>
      {props.router.asPath.startsWith('/sandbox') ? (
        <Component {...pageProps} />
      ) : (
        <div className="page">
          {props.router.asPath.startsWith('/docs') ? <SideNav /> : null}
          <main>
            <Component {...pageProps} />
          </main>
          {toc ? <TableOfContents toc={toc} /> : null}
        </div>
      )}
      <footer>
        © {new Date().getFullYear()} Stripe
        <div className="footer-links">
          <Link href="/docs/getting-started">Docs</Link> ·{'  '}
          <Link href="/sandbox">Try</Link> ·{' '}
          <Link href="https://github.com/stripe-oss/markdoc/discussions">
            Community
          </Link>{' '}
          ·{'  '}
          <Link href="https://github.com/stripe-oss/markdoc">
            GitHub
          </Link> · <Link href="https://twitter.com/StripeDev">Twitter</Link>
        </div>
      </footer>
      <style jsx>{`
        .page {
          display: flex;
          flex-grow: 1;
          padding-top: var(--nav-height);
          min-height: 100vh;
        }

        nav :global(a),
        footer :global(a) {
          color: hsla(0, 0%, 100%, 0.8);
        }

        nav :global(a:hover),
        footer :global(a:hover) {
          color: white;
        }

        .nav-bar {
          top: 0;
          position: fixed;
          z-index: 999;
          display: flex;
          width: 100%;
          background: var(--theme);
          padding: 0.5rem 0rem;
        }

        nav {
          display: flex;
          width: 100%;
          padding: 0 4rem 0 2rem;
          align-items: center;
          justify-content: space-between;
        }

        main {
          flex: 1 auto;
          max-width: 100%;
          min-width: 0;
          padding: 0 0 4rem 2rem;
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
        }

        footer {
          display: flex;
          color: hsla(0, 0%, 100%, 0.8);
          width: 100%;
          padding: 1rem 2rem;
          background: var(--theme);
        }

        .footer-links {
          margin-left: 2rem;
        }
      `}</style>
    </>
  );
}
