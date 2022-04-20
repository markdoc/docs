import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

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

const FONTS_BASE_URL = process.env.NEXT_PUBLIC_FONTS_BASE_URL || '/fonts';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
function useGoogleAnalytics() {
  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}

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
  useGoogleAnalytics();

  return (
    <div className={`${isLandingPage ? 'page--landing' : ''}`}>
      {/* https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
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
          <Link href="/sandbox">Try</Link>
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
      <div className="footer-bar">
        <Footer>
          <Link href="/docs/getting-started">Docs</Link>
          <Link href="https://github.com/markdoc/markdoc">GitHub</Link>
          <Link href="https://github.com/markdoc/markdoc/discussions">
            Community
          </Link>
          <Link href="https://twitter.com/StripeDev">Twitter</Link>
        </Footer>
      </div>
      <style jsx global>
        {`
          @font-face {
            font-family: 'GT America Mono';
            font-style: normal;
            font-weight: normal;
            src: url('${FONTS_BASE_URL}/GT-America-Mono-Regular.otf')
              format('opentype');
          }

          @font-face {
            font-family: 'GT America Mono';
            font-style: normal;
            font-weight: 500;
            src: url('${FONTS_BASE_URL}/GT-America-Mono-Medium.otf')
              format('opentype');
          }

          @font-face {
            font-family: 'Tiempos';
            font-style: normal;
            src: url('${FONTS_BASE_URL}/test-tiempos-headline-light.woff2');
          }

          .page {
            display: flex;
            flex-grow: 1;
            padding-top: var(--nav-height);
            min-height: 100vh;
            max-width: 100vw;
            ${isDocs ? 'border-bottom: 1px solid var(--gray-medium);' : ''}
          }

          .dark .page {
            border-bottom-color: var(--black-light);
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
            max-width: 100%;
            /* https://stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container */
            min-width: 0;
          }

          main article {
            ${isDocs ? 'padding: 2rem 1.5rem 3rem; 2rem' : ''}
          }

          main h3.jumbo {
            max-width: 385px; /* put "Stripe documentation" on new line */
          }

          .footer-bar {
            flex: 1;
            margin: 0 auto;
            padding: ${isLandingPage ? '2.5rem 0' : 'padding: 0'};
            max-width: ${isLandingPage
              ? 'var(--landing-page-max-width)'
              : 'calc(100% - 4rem)'};
          }

          /* Landing page overrides */
          /* Move top border to first section */
          .page--landing .nav-bar nav {
            border-bottom: none;
          }

          .page--landing p {
            letter-spacing: 0.02em;
          }

          .page--landing blockquote {
            max-width: 520px;
          }

          /* Style hero section */
          .page--landing .hero section {
            padding: 5.1rem 0 3.5rem;
          }

          .page--landing .sandbox {
            border-radius: 3px;
          }

          .page--landing .sandbox .preview p {
            letter-spacing: initial;
          }

          /* Show 'Try' text on hover on the landing page */
          .page--landing .sandbox .container:hover #hover {
            display: block;
          }

          .page--landing .value-props section {
            padding-top: 0;
          }

          .page--landing .get-started {
            background: var(--theme);
          }

          .dark .page--landing .get-started {
            background: var(--black-medium);
          }

          .page--landing .get-started section .primary {
            padding-top: 1rem;
            /* separate top and bottom on mobile */
            padding-bottom: 2rem;
          }

          .page--landing .try span.cm-keyword,
          .page--landing .try span.cm-tag,
          .page--landing .try span.cm-string {
            color: var(--white);
          }

          .page--landing .characteristics {
            background: var(--gray-light);
            padding-bottom: 2rem;
          }

          .dark .page--landing .characteristics {
            background: var(--black);
          }

          .page--landing pre[class*='language-'] {
            border-radius: 3px;
            border: none;
            background: var(--black) !important;
            padding: 25px;
          }

          /* Make "npm install" code block thinner */
          .page--landing .code:first-of-type pre[class*='language-'] {
            padding: 20px 25px;
          }

          .page--landing .nav-bar nav {
            max-width: var(--landing-page-max-width);
            padding: 1rem 0 1.1rem;
          }

          .page--landing .side-by-side .left {
            border-right: none;
          }

          .page--landing .code button {
            display: none;
          }

          .page--landing table {
            table-layout: fixed;
            width: 100%;
            margin: 0 0 3rem;
          }

          .page--landing tbody {
            /* border: 1px solid #151517; */
            border-radius: 0;
            border-style: initial;
            box-shadow: none;
          }

          .page--landing table {
            position: relative;
            border-collapse: collapse;
          }

          .page--landing table td {
            position: relative;
            border-width: 1px;
            border-color: var(--dark);
            border-style: dashed solid;
            background: var(--light);
            border-radius: 0;
            padding: 20px 24px 26px;
            /* https://stackoverflow.com/questions/7517127/borders-not-shown-in-firefox-with-border-collapse-on-table-position-relative-o */
            background-clip: padding-box;
            vertical-align: top;
          }

          .page--landing table td strong {
            font-family: var(--mono);
            font-size: 14px;
            font-weight: 500;
            line-height: 27px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .page--landing table td p {
            font-size: var(--font-size-3);
            line-height: var(--line-height-3);
          }

          .page--landing table::after,
          .page--landing table::before,
          .page--landing table td::after,
          .page--landing table td::before {
            position: absolute;
            content: '';
            background: var(--light);
            width: 10px;
            height: 10px;
          }

          .page--landing table::after,
          .page--landing table::before,
          .page--landing table td::after,
          .page--landing table td::before {
            z-index: 99;
          }

          .page--landing table::after {
            top: -5px;
            right: -5px;
          }

          .page--landing table::before {
            bottom: -5px;
            left: -5px;
          }

          .page--landing table td::after {
            top: -5px;
            left: -5px;
          }

          .page--landing table td::before {
            bottom: -5px;
            right: -5px;
          }

          @media screen and (max-width: 900px) {
            .page--landing .hero section {
              padding: 3rem 0 0;
            }
            .page--landing .try section {
              max-width: unset;
            }
            .page--landing .characteristics {
              padding-bottom: 1rem;
            }
            .page--landing table {
              margin: 0;
            }
            .page--landing table td {
              padding: 15px 21px 24px;
            }
          }

          @media screen and (max-width: 420px) {
            .page--landing .hero section {
              padding: 2rem 0 2.5rem;
            }
            .page--landing table tr {
              display: flex;
              flex-direction: column;
            }
            .page--landing table td {
              padding: 14px 16px 20px;
            }
            .footer-bar {
              padding: 35px 0 5rem;
            }
          }
        `}
      </style>
    </div>
  );
}
