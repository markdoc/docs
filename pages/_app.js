import React from 'react';
import Head from 'next/head';

import { AppLink as Link } from '../components/AppLink';
import { Footer, SideNav, TableOfContents, TopNav } from '../components/Shell';

import 'prismjs';
import 'codemirror/lib/codemirror.css';
import 'prismjs/themes/prism.css';

import '../public/globals.css';

const MARKDOC = `


  ███    ███  █████  ██████  ██   ██ ██████   ██████   ██████
  ████  ████ ██   ██ ██   ██ ██  ██  ██   ██ ██    ██ ██
  ██ ████ ██ ███████ ██████  █████   ██   ██ ██    ██ ██
  ██  ██  ██ ██   ██ ██   ██ ██  ██  ██   ██ ██    ██ ██
  ██      ██ ██   ██ ██   ██ ██   ██ ██████   ██████   ██████



`;

function collectHeadings(nodes, sections = []) {
  nodes.forEach((node) => {
    if (node) {
      if (node.name === 'Heading') {
        const title = node.children[0];

        if (typeof title === 'string') {
          sections.push({
            ...node.attributes,
            title
          });
        }
      }
      if (node.children) {
        collectHeadings(node.children, sections);
      }
    }
  });

  return sections;
}

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const { markdoc } = pageProps;

  let description = 'A Markdown-based authoring framework';
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
    ? collectHeadings([].concat(pageProps.markdoc.content))
    : [];

  const isDocs = props.router.asPath.startsWith('/docs');
  const isLandingPage = props.router.pathname === '/';

  React.useEffect(() => console.log(MARKDOC), []);

  return (
    <div className={`${isLandingPage ? 'page--landing' : ''}`}>
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
      <TopNav>
        <Link href="/docs/getting-started">Docs</Link>
        <Link href="https://github.com/markdoc/markdoc">GitHub</Link>
        <Link href="https://github.com/markdoc/markdoc/discussions">
          Community
        </Link>
        <Link href="https://twitter.com/StripeDev">Twitter</Link>
        <span className="primary no-mobile">
          <Link href="/sandbox">Try&nbsp;→</Link>
        </span>
      </TopNav>
      <div className="page">
        {isDocs ? <SideNav /> : null}
        <main className="flex column">
          <div id="skip-nav" />
          <Component {...pageProps} />
        </main>
        {isDocs && toc ? <TableOfContents toc={toc} /> : null}
      </div>
      {/* TODO remove isDocs, isLandingPage here */}
      <Footer isDocs={isDocs} isLandingPage={isLandingPage}>
        <Link href="/docs/getting-started">Docs</Link>
        <Link href="https://github.com/markdoc/markdoc">GitHub</Link>
        <Link href="https://github.com/markdoc/markdoc/discussions">
          Community
        </Link>
        <Link href="https://twitter.com/StripeDev">Twitter</Link>
      </Footer>
      <style jsx>
        {`
          .page {
            display: flex;
            flex-grow: 1;
            padding-top: var(--nav-height);
            min-height: 100vh;
          }

          .skip-nav {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            width: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            position: absolute;
          }

          .skip-nav:focus {
            padding: 1rem;
            position: fixed;
            top: 10px;
            left: 10px;
            background: var(--white);
            z-index: 1000;
            width: auto;
            height: auto;
            clip: auto;
          }

          main {
            flex-grow: 1;
            /* TODO clean up padding logic (and below in @media) */
            ${isDocs ? 'padding: 2rem 4rem 4rem;' : ''}
          }

          main :global(h3.jumbo) {
            max-width: 80%; /* put "Stripe documentation" on new line */
          }

          /* Landing page overrides */
          .page--landing :global(pre[class*='language-']) {
            border-radius: 0px;
            border: none;
            background: var(--black) !important;
          }

          .page--landing :global(.nav-bar nav) {
            padding: 0.5rem 0;
            max-width: var(--landing-page-max-width);
          }

          .page--landing :global(.side-by-side .left) {
            border-right: none;
          }

          .page--landing :global(.code button) {
            display: none;
          }

          .page--landing :global(table) {
            table-layout: fixed;
            width: 100%;
          }

          .page--landing :global(tbody) {
            /* border: 1px solid #151517; */
            border-radius: 0;
            border-style: initial;
            box-shadow: none;
          }

          .page--landing :global(table) {
            position: relative;
            border-collapse: collapse;
          }

          .page--landing :global(table td) {
            position: relative;
            border-width: 1px;
            border-color: var(--dark);
            border-style: dashed solid;
            background: var(--light);
            border-radius: 0;
            padding: 0.75rem 1.5rem 1.5rem;
            /* https://stackoverflow.com/questions/7517127/borders-not-shown-in-firefox-with-border-collapse-on-table-position-relative-o */
            background-clip: padding-box;
          }

          .page--landing :global(table td strong) {
            font-family: var(--decoration);
            font-size: 15px;
            font-weight: 400;
            line-height: 27px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .page--landing :global(table td p) {
            font-size: var(--font-size-3);
            line-height: var(--line-height-3);
          }

          .page--landing :global(table::after),
          .page--landing :global(table::before),
          .page--landing :global(table td::after),
          .page--landing :global(table td::before) {
            position: absolute;
            content: '';
            background: var(--light);
            width: 10px;
            height: 10px;
          }

          .page--landing :global(table::after),
          .page--landing :global(table::before),
          .page--landing :global(table td::after),
          .page--landing :global(table td::before) {
            z-index: 99;
          }

          .page--landing :global(table::after) {
            top: -5px;
            right: -5px;
          }

          .page--landing :global(table::before) {
            bottom: -5px;
            left: -5px;
          }

          .page--landing :global(table td::after) {
            top: -5px;
            left: -5px;
          }

          .page--landing :global(table td::before) {
            bottom: -5px;
            right: -5px;
          }

          @media screen and (max-width: 420px) {
            main {
              ${isDocs ? 'padding: 2rem;' : ''};
            }
            .page--landing :global(table) {
              margin: 0;
            }
            .page--landing :global(table tr) {
              display: flex;
              flex-direction: column;
            }
          }
        `}
      </style>
    </div>
  );
}
