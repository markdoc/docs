// @flow

import {Ast} from '@stripe-internal/markdoc';

import {Callout} from '../components/Callout';

export const callout = {
  Component: Callout,
  description: 'Display the enclosed content in a callout box',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['caution', 'check', 'note', 'warning'],
      errorLevel: 'critical',
      description:
        'Controls the color and icon of the callout. Can be: "caution", "check", "note", "warning"',
    },
    title: {
      type: String,
      description: 'The title displayed at the top of the callout',
      localizable: true,
    },
  },
};