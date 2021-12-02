import React from 'react';
import Head from 'next/head';

import * as components from '../components';
import * as registrations from '../components/tags';

import '../styles/globals.css';

// TODO move this into Markdoc itself
function createMarkdocNodesAndTags(registrations) {
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

  return {
    tags,
    nodes,
  };
}

export default function MyApp(props) {
  const {Component, pageProps} = props;
  const {isMarkdoc, frontmatter} = pageProps;

  if (isMarkdoc) {
    const config = {
      ...createMarkdocNodesAndTags(registrations),
      functions: {},
      variables: {},
    };

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
        <Component components={components} variables={{}} config={config} />
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
