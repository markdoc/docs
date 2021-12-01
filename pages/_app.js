import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({Component, pageProps}) {
  const title = `Markdoc | ${
    pageProps?.frontmatter?.title || 'A Markdown-based authoring system'
  }`;
  const description =
    pageProps?.frontmatter?.description || 'A Markdown-based authoring system';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
