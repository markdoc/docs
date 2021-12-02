import React from 'react';
import Head from 'next/head';

import * as components from '../components';

import '../styles/globals.css';

export default function MyApp(props) {
  const {Component, pageProps} = props;
  const {isMarkdoc, content, frontmatter} = pageProps;

  if (isMarkdoc) {
    const title = `Markdoc | ${
      frontmatter?.title || 'A Markdown-based authoring system'
    }`;
    const description =
      frontmatter?.description || 'A Markdown-based authoring system';

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component content={content} components={components} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>A Markdown-based authoring system</title>
        <meta name="title" content="A Markdown-based authoring system" />
        <meta name="description" content="A Markdown-based authoring system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps}>{null}</Component>
    </>
  );
}
