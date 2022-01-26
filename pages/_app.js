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
      <style jsx>{`
        .page :global(pre) {
          border-radius: 3px;
        }
        .page :global(ol) {
          padding-left: 1em;
        }

        .page {
          padding: 0 2rem;
        }

        .nav-bar {
          display: flex;
          width: 100%;
          background: #09825d;
          padding: 1rem 0rem;
        }

        nav {
          display: flex;
          width: 100%;
          padding: 0 2rem;
          align-items: center;
          justify-content: space-between;
        }

        ul {
          display: flex;
          flex-flow: row nowrap;
          margin: 0;
          padding: 0;
        }

        li {
          color: white;
          list-style-type: none;
          margin-left: 2rem;
          font-size: 16px;
          font-weight: 5 00;
        }
      `}</style>
    </>
  );
}
