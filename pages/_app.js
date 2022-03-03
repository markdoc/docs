import React from 'react';
import Head from 'next/head';
import config from 'next/config';

import { AppLink as Link } from '../components/AppLink';
import SideNav from '../components/SideNav';
import TableOfContents from '../components/TableOfContents';

import 'codemirror/lib/codemirror.css';
import 'prismjs';
import 'prismjs/themes/prism.css';

import '../public/globals.css';
import '../public/sandbox.css';

function collectHeadings(node, sections = []) {
  if (node) {
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
  }

  return sections;
}

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const { markdoc } = pageProps;

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

  const { basePath } = config().publicRuntimeConfig;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="referrer" content="strict-origin" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* https://webaim.org/techniques/skipnav/ */}
      <a href="#skip-nav" className="skip-nav">
        Skip to content
      </a>
      <div className="nav-bar">
        <nav>
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={basePath + '/logo.svg'}
              alt="Markdoc logo"
              width={100}
              height={45}
            />
          </Link>
          <ul className="links">
            <li>
              <Link href="/docs/getting-started">Docs</Link>
            </li>
            <li>
              <Link href="/sandbox">Try</Link>
            </li>
            <li>
              <Link href="https://github.com/markdoc/markdoc/discussions">
                Community
              </Link>
            </li>
            <li>
              <Link href="https://github.com/markdoc/markdoc">GitHub</Link>
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
          <div id="skip-nav" />
          <main className="main">
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
          <Link href="https://github.com/markdoc/markdoc/discussions">
            Community
          </Link>{' '}
          ·{'  '}
          <Link href="https://github.com/markdoc/markdoc">GitHub</Link> ·{' '}
          <Link href="https://twitter.com/StripeDev">Twitter</Link>
        </div>
      </footer>
    </>
  );
}
