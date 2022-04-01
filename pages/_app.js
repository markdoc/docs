import React from 'react';
import Head from 'next/head';

import { AppLink as Link } from '../components/AppLink';
import SideNav from '../components/SideNav';
import TableOfContents from '../components/TableOfContents';
import { ThemeToggle } from '../components/ThemeToggle';

import 'codemirror/lib/codemirror.css';
import 'prismjs';
import 'prismjs/themes/prism.css';

import '../public/globals.css';
import '../public/sandbox.css';

const MARKDOC = `


  ███    ███  █████  ██████  ██   ██ ██████   ██████   ██████
  ████  ████ ██   ██ ██   ██ ██  ██  ██   ██ ██    ██ ██
  ██ ████ ██ ███████ ██████  █████   ██   ██ ██    ██ ██
  ██  ██  ██ ██   ██ ██   ██ ██  ██  ██   ██ ██    ██ ██
  ██      ██ ██   ██ ██   ██ ██   ██ ██████   ██████   ██████



`;

function collectHeadings(nodes, sections = []) {
  nodes.forEach((node) => {
    if (node?.name === 'Heading') {
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

  React.useEffect(() => console.log(MARKDOC), []);

  return (
    <div className={`${props.router.pathname === '/' ? 'page--landing' : ''}`}>
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
          <Link href="/" style={{ display: 'flex' }}>
            <svg
              width="112"
              height="37"
              viewBox="0 0 112 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="58.8"
                y="4.66669"
                width="53.2"
                height="28"
                rx="1.86667"
                fill="var(--theme)"
              />
              <path
                d="M66.6732 11.0502V26H71.4108C75.2009 26 77.6223 22.8837 77.6223 18.4198C77.6223 14.0402 75.3904 11.0502 71.4529 11.0502H66.6732ZM71.2424 23.9365H69.2631V13.1137H71.2845C73.748 13.1137 74.9693 15.3036 74.9693 18.4198C74.9693 21.5993 73.6638 23.9365 71.2424 23.9365ZM85.4366 26.358C89.1845 26.358 91.0164 23.6838 91.0164 19.2831V17.7671C91.0164 13.3664 89.1845 10.6923 85.4366 10.6923C81.6886 10.6923 79.8567 13.3664 79.8567 17.7671V19.2831C79.8567 23.6838 81.6886 26.358 85.4366 26.358ZM85.4366 24.2313C83.4152 24.2313 82.5098 22.7153 82.5098 19.3463V17.7039C82.5098 14.335 83.4152 12.8189 85.4366 12.8189C87.4579 12.8189 88.3634 14.335 88.3634 17.7039V19.3463C88.3634 22.7153 87.4579 24.2313 85.4366 24.2313ZM98.8938 26.358C102.347 26.358 104.221 24.1681 104.432 21.0097L101.863 20.5254C101.736 22.9258 100.768 24.2102 98.9991 24.2102C97.0198 24.2102 96.0513 22.4626 96.0513 19.1989V17.7039C96.0513 14.4192 96.9777 12.84 98.9991 12.84C100.747 12.84 101.736 14.1455 101.863 16.5037L104.453 16.1037C104.179 12.4189 102.221 10.6923 99.0202 10.6923C95.2722 10.6923 93.3982 13.3875 93.3982 17.746V19.3042C93.3982 23.6628 95.209 26.358 98.8938 26.358Z"
                fill="var(--black)"
              />
              <path
                d="M7.53805 22.3573L8.6119 17.0512C8.80141 16.1879 9.07514 14.6298 9.18042 13.6822H9.32781C9.26464 14.9035 9.22253 16.7354 9.22253 17.9145V26H11.5387V11.0502H8.27501L6.86426 17.8092C6.75898 18.4409 6.63264 19.2621 6.59053 19.7043H6.46419C6.42208 19.2621 6.29575 18.4409 6.19046 17.8092L4.77971 11.0502H1.51603V26H3.83219V17.9145C3.83219 16.7354 3.79008 14.9035 3.72691 13.6822H3.8743C4.00064 14.6298 4.25331 16.1879 4.44282 17.0512L5.51667 22.3573H7.53805ZM22.3639 22.1889L23.4589 26H26.0066L21.5006 11.0502H18.5107L14.0047 26H16.5525L17.6263 22.1889H22.3639ZM19.9636 13.198H20.0478C20.3847 15.0298 20.9321 17.2618 21.7744 20.1043H18.2159C19.0581 17.2618 19.6267 15.0298 19.9636 13.198ZM33.4419 19.8727L36.4529 26H39.2954L35.9686 19.4305C37.7794 18.8199 38.8111 17.4092 38.8111 15.5141C38.8111 12.6716 36.9372 11.0502 33.6524 11.0502H28.5569V26H31.1468V19.8727H33.4419ZM31.1468 18.0198V13.0506H33.4208C35.1685 13.0506 36.0949 13.9349 36.0949 15.5352C36.0949 17.1354 35.1685 18.0198 33.4208 18.0198H31.1468ZM46.6675 18.7567L50.2681 26H53.258L48.5836 16.967L52.8159 11.0502H49.8259L45.0041 18.0829V11.0502H42.4142V26H45.0041V21.0729L46.6675 18.7567Z"
                fill="var(--dark)"
              />
            </svg>
          </Link>
          <ul className="links">
            <li>
              <Link href="/docs/getting-started">Docs</Link>
            </li>
            <li>
              <Link href="https://github.com/markdoc/markdoc">GitHub</Link>
            </li>
            <li>
              <Link href="https://github.com/markdoc/markdoc/discussions">
                Community
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/StripeDev">Twitter</Link>
            </li>
            <li className="primary">
              <Link href="/sandbox">Try →</Link>
            </li>
          </ul>
        </nav>
      </div>
      {isDocs ? (
        <div className="page">
          <SideNav />
          <main className="document">
            <div id="skip-nav" />
            <Component {...pageProps} />
          </main>
          {toc ? <TableOfContents toc={toc} /> : null}
        </div>
      ) : (
        <main className="page">
          <div id="skip-nav" />
          <Component {...pageProps} />
        </main>
      )}
      <div
        className="footer-bar"
        style={{
          borderTop: isDocs ? '1px solid var(--dark)' : undefined
        }}
      >
        <footer>
          © {new Date().getFullYear()} Stripe
          <div style={{ marginLeft: '2rem' }}>
            <Link href="/docs/getting-started">Docs</Link>
            <Link href="https://github.com/markdoc/markdoc">GitHub</Link>
            <Link href="https://github.com/markdoc/markdoc/discussions">
              Community
            </Link>
            <Link href="https://twitter.com/StripeDev">Twitter</Link>
          </div>
          <ThemeToggle />
        </footer>
      </div>
    </div>
  );
}
