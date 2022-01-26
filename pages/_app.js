import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import 'codemirror/lib/codemirror.css';
import '../styles/globals.css';

export default function MyApp(props) {
  const {Component, pageProps} = props;
  const {isMarkdoc, frontmatter} = pageProps;

  let description = 'A Markdown-based authoring system';
  let title = `Markdoc | ${description}`;
  if (isMarkdoc && frontmatter) {
    if (frontmatter.title) {
      title = `Markdoc | ${frontmatter.title}`;
    }
    if (frontmatter.description) {
      description = frontmatter.description;
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="nav-bar">
        <nav>
          <Link href="/">
            <a>
              <Image
                src="/logo.svg"
                alt="Markdoc logo"
                width={100}
                height={45}
              />
            </a>
          </Link>
          <ul className="links">
            <li>
              <Link href="/getting-started">Docs</Link>
            </li>
            <li>
              <Link href="/sandbox">Try</Link>
            </li>
            <li>
              <Link href="" target="_blank">
                Community
              </Link>
            </li>
            <li>
              <Link href="https://github.com/markdoc/markdoc" target="_blank">
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="page">
        <Component {...pageProps} />
      </div>
      <footer>
        © {new Date().getFullYear()} Stripe
        <div className="footer-links">
          <Link href="/getting-started">Getting started</Link> ·{'  '}
          <Link href="/sandbox">Try</Link> · <Link href="/todo">Community</Link>{' '}
          · <Link href="https://twitter.com/StripeDev">Twitter</Link>
        </div>
      </footer>
      <style jsx>{`
        .page :global(pre) {
          border-radius: 3px;
        }
        .page :global(ol) {
          padding-left: 1em;
        }

        .page {
          padding: 0 4rem 0 2rem;
        }

        .nav-bar {
          display: flex;
          width: 100%;
          background: var(--theme);
          padding: 1rem 0rem;
        }

        nav :global(a),
        footer :global(a) {
          color: hsla(0, 0%, 100%, 0.8);
        }

        nav :global(a:hover),
        footer :global(a:hover) {
          color: white;
        }

        nav {
          display: flex;
          width: 100%;
          padding: 0 4rem 0 2rem;
          align-items: center;
          justify-content: space-between;
        }

        footer {
          display: flex;
          color: hsla(0, 0%, 100%, 0.8);
          width: 100%;
          margin-top: 4rem;
          padding: 1rem 2rem;
          background: var(--theme);
        }

        .footer-links {
          margin-left: 2rem;
        }

        ul {
          display: flex;
          flex-flow: row nowrap;
          margin: 0;
          padding: 0;
        }

        li {
          list-style-type: none;
          margin-left: 1.5rem;
          font-size: 16px;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}
