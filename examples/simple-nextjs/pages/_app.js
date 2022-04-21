import '../public/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <main>
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
