import React from 'react';
import Head from 'next/head';

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
      <Component {...pageProps} />
    </>
  );
}
