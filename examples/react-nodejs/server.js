import express from 'express';
const app = express();
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import markdoc from '@markdoc/markdoc';
const { transform } = markdoc;
import callout from './schema/Callout.markdoc.js';
import heading from './schema/heading.markdoc.js';
import { createContentManifest } from './createContentManifest.js';

const PORT = 5001;
const CONTENT_DIR = join(__dirname, 'content');

// The content manifest maps routes to Markdoc documents.
const contentManifest = createContentManifest(CONTENT_DIR);

app.get('/markdoc-api', (req, res) => {
  // Here we can dynamically fetch variables, like user preferences or feature flags
  const variables = {
    flags: {
      show_secret_feature: false
    }
  };

  const document = contentManifest[req.query.path];

  if (!document) {
    return res.sendStatus(404);
  }

  const { ast } = document;
  const config = {
    tags: {
      callout
    },
    nodes: {
      heading
    },
    variables: variables
  };
  const content = transform(ast, config);

  return res.json(content);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
