// @flow

import {Ast} from '@stripe-internal/markdoc';

import {Code} from '../components/Code';

export const fence = {
  node: 'fence',
  Component: Code,
  attributes: {
    language: {
      type: String,
      description:
        'The programming language of the code block. Place it after the backticks.',
    },
  },
};
