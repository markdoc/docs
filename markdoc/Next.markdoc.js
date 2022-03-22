import { link, markdocExample } from '@markdoc/next.js/tags';

import { AppLink } from '../components/AppLink';
import { Code } from '../components/Code';

export { comment } from '@markdoc/next.js/tags';

export const example = {
  ...markdocExample,
  Component: Code,
};

export const linkNode = {
  ...link,
  tag: undefined,
  Component: AppLink,
  node: 'link',
};
