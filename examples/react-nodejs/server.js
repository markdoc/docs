const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');
const callout = require('./schema/Callout.markdoc');

const PORT = 4242;

// We can easily programatically generate this mapping instead!
// See examples/createContentManifest.js for an example
const routeToFilepath = {
  '/example': 'example.md',
  '/variables': 'variables.md',
  '/': 'home.md'
};

const getMarkdocContent = (route, variables) => {
  const filePath = routeToFilepath[route] || '404.md';

  const doc = fs.readFileSync(
    path.join(__dirname, 'content', filePath),
    'utf-8'
  );

  const config = {
    // TODO: Add an example for using a custom node.
    tags: {
      callout
    },
    variables: variables
  };

  const ast = Markdoc.parse(doc);
  return Markdoc.transform(ast, config);
};

app.get('/markdoc-api', (req, res) => {
  // Here we can dynamically fetch variables, like user preferences, or
  // feature flags:
  const variables = {
    flags: {
      show_secret_feature: false
    }
  };
  const content = getMarkdocContent(req.query.path, variables);

  if (content) {
    return res.json(content);
  } else {
    console.log('Something went wrong.');
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
