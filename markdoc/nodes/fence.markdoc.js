import { nodes } from '@markdoc/markdoc';
import { Code } from '../../components/Code';

export default {
  ...nodes.fence,
  render: Code
};
