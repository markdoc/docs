import { markdocExample } from '@markdoc/next.js/tags';

import { Code } from '../../components/Code';

export { comment } from '@markdoc/next.js/tags';

export default {
  ...markdocExample,
  Component: Code
};
