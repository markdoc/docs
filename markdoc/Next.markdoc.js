import { link, markdocExample } from '@stripe-internal/next-markdoc/tags';

import { AppLink } from '../components/AppLink';
import { MarkdocExample } from '../components/MarkdocExample';

export { comment } from '@stripe-internal/next-markdoc/tags';

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
