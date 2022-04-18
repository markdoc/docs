const express = require('express');
const app = express();
const port = 4242;
const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');
const callout = require('./schema/Callout.markdoc');

// We can easily programatically generate this mapping instead!
// See examples/createContentManifest.js for an example
const routeToFilepath = {
  '/docs/example': 'example.md',
  '/docs/variables': 'variables.md',
  '/docs': 'home.md'
};

const returnMarkdocRenderTree = (route, variables) => {
  const filePath = routeToFilepath[route] || '404.md';

  const doc = fs.readFileSync(
    path.join(__dirname, 'content', filePath),
    'utf-8'
  );

  const config = {
    tags: {
      callout
    },
    variables: variables
  };

  const ast = Markdoc.parse(doc);
  return Markdoc.transform(ast, config);
};

app.get('*', (req, res) => {
  const variables = {
    flags: {
      show_secret_feature: req.query.showSecretFeature
    }
  };
  const renderTree = returnMarkdocRenderTree(req.path, variables);

  if (renderTree) {
    return res.json(renderTree);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
