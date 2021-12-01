import React from 'react';
import Head from 'next/head';
import Markdoc from '@stripe-internal/markdoc';

import * as components from '../components';
import * as registrations from '../components/tags';

import '../styles/globals.css';

const tags = {};
const nodes = {};
Object.values(registrations).forEach((registration) => {
  if (typeof registration.node === 'string') {
    const {node, component, ...schema} = registration;
    if (nodes[node]) {
      throw new Error(`Node already declared: ${node}`);
    }
    nodes[node] = {
      ...schema,
      tag: component,
    };
  } else {
    const {tag, component, ...schema} = registration;
    if (tags[tag]) {
      throw new Error(`Tag already declared: ${tag}`);
    }
    tags[tag] = {
      ...schema,
      tag: component,
    };
  }
});

export default function MyApp(props) {
  const {Component, pageProps} = props;
  const {isMarkdoc, mdConfig, mdAst: ast} = pageProps;

  if (isMarkdoc) {
    const config = {
      ...mdConfig,
      tags,
      nodes,
    };
    const mdast = Markdoc.fromJSON(JSON.stringify(ast));

    // Convert the AST into a rendered tree
    const processed = Markdoc.process(mdast, config);
    const content = Markdoc.expand(processed, config);

    const render = Markdoc.renderers.react(content, React);

    const title = `Markdoc | ${
      config.frontmatter?.title || 'A Markdown-based authoring system'
    }`;
    const description =
      config.frontmatter?.description || 'A Markdown-based authoring system';

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component>{render({components})}</Component>
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
