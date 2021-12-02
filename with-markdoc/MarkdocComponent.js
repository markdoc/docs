import React from 'react';
import Markdoc from '@stripe-internal/markdoc';

export function MarkdocComponent({mdConfig, mdAst, component}) {
  if (pageProps.mdConfig && pageProps.mdAst) {
    return;
    const {mdConfig: config, mdAst: ast} = pageProps;

    const mdast = Markdoc.fromJSON(JSON.stringify(ast));

    // Convert the AST into a rendered tree
    const nodes = Markdoc.process(mdast, config);
    const content = Markdoc.expand(nodes, config);

    const render = Markdoc.renderers.react(content, React);

    return {
      ...pageProps,
      children: render({components}),
    };
  }

  return null;
}
