import React from 'react';
import Head from 'next/head';

import { AppLink as Link } from '../components/AppLink';
import { SideNav } from '../components/SideNav';
import { TopNav } from '../components/TopNav';
import { TableOfContents } from '../components/TableOfContents';
import { ThemeToggle } from '../components/ThemeToggle';

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
      <div className="footer-bar">
        <footer>
          <svg
            width="99"
            height="28"
            viewBox="0 0 99 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.98432 20H6.27432C8.44932 20 9.81432 18.905 9.81432 17.03C9.81432 15.665 9.00432 14.72 7.78932 14.39C8.61432 14.105 9.45432 13.415 9.45432 12.035C9.45432 10.235 8.23932 9.23 5.95932 9.23H1.98432V20ZM3.37932 13.85V10.445H5.83932C7.27932 10.445 8.07432 11 8.07432 12.155C8.07432 13.295 7.27932 13.85 5.83932 13.85H3.37932ZM3.37932 15.08H6.21432C7.65432 15.08 8.43432 15.83 8.43432 16.925C8.43432 18.035 7.65432 18.785 6.21432 18.785H3.37932V15.08ZM18.0294 12.155H16.6794V16.88C16.6794 18.185 15.6894 18.92 14.7144 18.92C13.5594 18.92 13.0794 18.17 13.0794 17.06V12.155H11.7294V17.345C11.7294 19.01 12.6744 20.165 14.3544 20.165C15.4644 20.165 16.2294 19.58 16.6794 18.92V20H18.0294V12.155ZM20.5112 10.79H21.9812V9.23H20.5112V10.79ZM21.9212 12.155H20.5712V20H21.9212V12.155ZM25.8247 9.23H24.4747V20H25.8247V9.23ZM28.5882 18.125C28.5882 19.625 29.3532 20.075 30.6882 20.075C31.1382 20.075 31.5282 20.03 31.8732 19.955V18.8C31.5582 18.875 31.3332 18.89 31.0182 18.89C30.3282 18.89 29.9232 18.74 29.9232 17.915V13.31H31.7082V12.155H29.9232V9.86H28.5882V12.155H27.3732V13.31H28.5882V18.125ZM41.0199 20.165C43.1949 20.165 44.4399 18.305 44.4399 16.085C44.4399 13.85 43.1949 12.005 41.0199 12.005C39.9249 12.005 39.0549 12.53 38.5899 13.295V9.23H37.2399V20H38.5899V18.86C39.0549 19.64 39.9249 20.165 41.0199 20.165ZM38.5599 15.815C38.5599 13.985 39.6699 13.19 40.7799 13.19C42.2499 13.19 43.0749 14.39 43.0749 16.085C43.0749 17.765 42.2499 18.98 40.7799 18.98C39.6699 18.98 38.5599 18.17 38.5599 16.37V15.815ZM49.1804 20.855L52.5554 12.155H51.1454L48.9704 18.155L46.7654 12.155H45.3404L48.2504 19.715L47.8754 20.645C47.5604 21.425 47.2454 21.635 46.6604 21.635C46.4354 21.635 46.2704 21.62 46.0154 21.56V22.73C46.2554 22.775 46.4204 22.79 46.7504 22.79C48.1154 22.79 48.7304 22.04 49.1804 20.855Z"
              fill="var(--dark)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M98.7993 15.7837C98.7993 12.8784 97.3871 10.5861 94.688 10.5861C91.9774 10.5861 90.3374 12.8784 90.3374 15.761C90.3374 19.1768 92.2735 20.9018 95.0524 20.9018C96.4077 20.9018 97.4327 20.5954 98.2071 20.1642V17.8945C97.4327 18.2803 96.5443 18.5186 95.4168 18.5186C94.3121 18.5186 93.3327 18.1328 93.2074 16.7937H98.7766C98.7766 16.6461 98.7993 16.056 98.7993 15.7837ZM93.1732 14.7056C93.1732 13.4232 93.9591 12.8898 94.6766 12.8898C95.3713 12.8898 96.1116 13.4232 96.1116 14.7056H93.1732Z"
              fill="var(--stripe)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M85.9413 10.5861C84.8251 10.5861 84.1076 11.1081 83.709 11.4712L83.561 10.7676H81.0554V23.9999L83.9026 23.3985L83.914 20.1869C84.324 20.4819 84.9276 20.9018 85.9299 20.9018C87.9685 20.9018 89.8249 19.2676 89.8249 15.6702C89.8135 12.3791 87.9343 10.5861 85.9413 10.5861ZM85.2579 18.4052C84.586 18.4052 84.1874 18.1668 83.914 17.8718L83.9026 13.6615C84.1988 13.3324 84.6088 13.1054 85.2579 13.1054C86.2943 13.1054 87.0118 14.263 87.0118 15.7496C87.0118 17.2703 86.3057 18.4052 85.2579 18.4052Z"
              fill="var(--stripe)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M77.1377 9.91656L79.9963 9.30374V7L77.1377 7.60147V9.91656Z"
              fill="var(--stripe)"
            />
            <path
              d="M79.9963 10.7791H77.1377V20.709H79.9963V10.7791Z"
              fill="var(--stripe)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M74.074 11.6188L73.8918 10.779H71.4318V20.709H74.279V13.9793C74.9509 13.1055 76.0898 13.2644 76.4429 13.3892V10.779C76.0784 10.6429 74.7459 10.3932 74.074 11.6188Z"
              fill="var(--stripe)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M68.3796 8.31641L65.6007 8.90653L65.5894 17.9966C65.5894 19.6762 66.8535 20.9132 68.5391 20.9132C69.473 20.9132 70.1563 20.743 70.5321 20.5387V18.235C70.1677 18.3825 68.3682 18.9045 68.3682 17.225V13.1962H70.5321V10.779H68.3682L68.3796 8.31641Z"
              fill="var(--stripe)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60.6807 13.6615C60.6807 13.2189 61.0452 13.0487 61.6488 13.0487C62.5143 13.0487 63.6076 13.3097 64.4732 13.775V11.1081C63.5279 10.7336 62.594 10.5861 61.6488 10.5861C59.3368 10.5861 57.7993 11.789 57.7993 13.7977C57.7993 16.9299 62.1271 16.4305 62.1271 17.781C62.1271 18.303 61.6715 18.4732 61.0338 18.4732C60.0885 18.4732 58.8813 18.0874 57.9246 17.5654V20.2663C58.9838 20.7202 60.0543 20.9132 61.0338 20.9132C63.4026 20.9132 65.0313 19.7443 65.0313 17.7129C65.0199 14.3311 60.6807 14.9325 60.6807 13.6615Z"
              fill="var(--stripe)"
            />
          </svg>
          <span className="copyright">© {new Date().getFullYear()} Stripe</span>
          <div>
            <Link href="/docs/getting-started">Docs</Link>
            <Link href="https://github.com/markdoc/markdoc">GitHub</Link>
            <Link href="https://github.com/markdoc/markdoc/discussions">
              Community
            </Link>
            <Link href="https://twitter.com/StripeDev">Twitter</Link>
          </div>
          <span className="disclaimer">
            This site was entirely{' '}
            <button
              onClick={() => {
                if (window.__toggle_editor__) {
                  window.__toggle_editor__();
                }
              }}
            >
              built using Markdoc
            </button>
          </span>
          <ThemeToggle />
        </footer>
      </div>
      <style jsx>
        {`
          main {
            flex-grow: 1;
            ${isDocs ? 'padding: 2rem 4rem 4rem;' : ''}
          }

          main :global(hr) {
            margin: 6rem 0 5rem;
          }

          .page {
            display: flex;
            flex-grow: 1;
            padding-top: var(--nav-height);
            min-height: 100vh;
            ${isLandingPage ? 'border-bottom: none;' : ''}
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

          .footer-bar {
            margin: 0 auto;
            ${isDocs ? 'border-top: 1px solid var(--dark);' : ''}
            ${isLandingPage ? 'max-width: var(--landing-page-max-width);' : ''}
          }

          footer {
            position: relative;
            display: flex;
            align-items: center;
            z-index: 100;
            width: 100%;
            color: var(--dark);
            padding: ${isLandingPage ? '3.5rem 0' : '1rem 2rem'};
          }

          footer :global(a),
          footer .copyright {
            margin-left: 1.5rem;
          }

          .disclaimer {
            color: rgba(24, 24, 27, 0.5);
            margin-left: auto;
            margin-right: 1.5rem;
            font-size: 15px;
            font-weight: 400;
            line-height: 27px;
          }

          .disclaimer button {
            display: inline-block;
            padding: 0;
            color: inherit;
            text-decoration: underline;
            font-weight: regular;
          }

          :global(body.dark) .disclaimer {
            color: var(--white);
          }

          /* TODO incorporate these styles above */
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
            .footer-bar {
              display: none;
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
