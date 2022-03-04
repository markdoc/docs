import { link, markdocExample } from '@markdoc/next.js/tags';

import { AppLink } from '../components/AppLink';
import { MarkdocExample } from '../components/MarkdocExample';

export { comment } from '@markdoc/next.js/tags';

export const example = {
  ...markdocExample,
  Component: MarkdocExample,
};

export const linkNode = {
  ...link,
  tag: undefined,
  Component: AppLink,
  node: 'link',
};
