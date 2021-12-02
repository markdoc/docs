import React from 'react';
import Head from 'next/head';
import Markdoc from '@stripe-internal/markdoc';

import * as components from '../components';

import '../styles/globals.css';

// Update Markdoc APIs
function MarkdocShim(config = {}) {
  return {
    ...Markdoc,
    process(ast) {
      return Markdoc.process(ast, config);
    },
    expand(nodes) {
      return Markdoc.expand(processed, config);
    },
    renderers: {
      ...Markdoc.renderers,
      react:
        (React, {components = {}} = {}) =>
        (content, variables = {}) =>
          Markdoc.renderers.react(content, React)({components, variables}),
    },
  };
}

export default function MyApp(props) {
  const {Component, pageProps} = props;
  const {isMarkdoc, mdConfig, mdAst: ast, mdFrontmatter} = pageProps;

  if (isMarkdoc) {
    const markdoc = MarkdocShim(mdConfig);

    const render = markdoc.renderers.react(React, {components});

    const mdast = markdoc.fromJSON(JSON.stringify(ast));
    // Convert the AST into a rendered tree
    const processed = markdoc.process(mdast);
    const content = Markdoc.expand(processed);

    const title = `Markdoc | ${
      mdFrontmatter?.title || 'A Markdown-based authoring system'
    }`;
    const description =
      mdFrontmatter?.description || 'A Markdown-based authoring system';

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component>{render(content)}</Component>
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
