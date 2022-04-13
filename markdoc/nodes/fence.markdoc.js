// @flow

import { Code } from '../../components/Code';

export default {
  Component: Code,
  attributes: {
    content: { type: String },
    language: {
      type: String,
      description:
        'The programming language of the code block. Place it after the backticks.'
    }
  }
};
