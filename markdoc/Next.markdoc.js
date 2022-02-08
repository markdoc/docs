import {markdocExample} from '@stripe-internal/next-markdoc/tags';
import {Code} from '../components/Code';

export {comment} from '@stripe-internal/next-markdoc/tags';
export const example = {
  ...markdocExample,
  Component({exampleCode}) {
    return <Code language="md">{exampleCode}</Code>;
  },
};
