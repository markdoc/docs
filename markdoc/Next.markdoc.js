import {link, markdocExample} from '@stripe-internal/next-markdoc/tags';
import {AppLink} from '../components/AppLink';
import {Code} from '../components/Code';

export {comment} from '@stripe-internal/next-markdoc/tags';
export const example = {
  ...markdocExample,
  Component({exampleCode}) {
    return <Code language="md">{exampleCode}</Code>;
  },
};

export const linkNode = {
  ...link,
  tag: undefined,
  Component: AppLink,
  node: 'link',
};
