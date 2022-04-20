import '../public/globals.css';
import { TableOfContent } from '../components/TableOfContent';
import { NavBar } from '../components/NavBar';
import 'prismjs';
import 'prismjs/themes/prism.css';

const MyApp = ({ Component, pageProps }) => {
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

  const toc = pageProps.markdoc?.content
    ? collectHeadings([].concat(pageProps.markdoc.content))
    : [];

  pageProps.markdoc?.content?.children.map((x) => {
    if (x.name === 'pre' || x.name === 'code') {
      const code = x.attributes['data-language'];
      x.attributes.class = `language-${code}`;
    }
  });

  return (
    <main>
      <NavBar />
      <TableOfContent toc={toc} />
      <section className="container">
        <Component {...pageProps} />
      </section>
      <footer>
        This is a boilerplate for Markdoc by{' '}
        <a href="https://twitter.com/stripedev">@StripeDev</a>
      </footer>
      <style jsx>{`
        .container {
          font-size: 16px;
          grid-column: 2 / 3;
          grid-row: 2;
          padding: 2em;
        }
        footer {
          grid-column: 1 / 4;
          grid-row: 3;
          text-align: center;
          padding: 0.8em 0;
          border-top: 1px solid rgba(227, 232, 238, 1);
          font-size: 0.9em;
          width: 100%;
          font-weight: 300;
          background: rgba(243, 244, 246, 1);
        }
      `}</style>
    </main>
  );
};

export default MyApp;
