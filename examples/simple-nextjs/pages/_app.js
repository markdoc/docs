import '../public/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        This is a boilerplate for Markdoc by{' '}
        <a href="https://twitter.com/StripeDev">@StripeDev</a>
      </footer>
    </>
  );
}
