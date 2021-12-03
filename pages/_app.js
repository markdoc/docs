import React from 'react';
import Head from 'next/head';
import yaml from 'js-yaml';

import * as components from '../components';

import '../styles/globals.css';

export default function MyApp(props) {
  const {Component, pageProps} = props;
  const {isMarkdoc, content, frontmatter} = pageProps;

  let description = 'A Markdown-based authoring system';
  let title = `Markdoc | ${description}`;
  if (isMarkdoc) {
    if (frontmatter) {
      const fm = yaml.load(frontmatter);
      if (fm.title) {
        title = `Markdoc | ${fm.title}`;
      }
      if (fm.description) {
        description = fm.description;
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
        <Component content={content} components={components} />
      </>
    );
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
