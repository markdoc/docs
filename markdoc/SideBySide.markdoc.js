// @flow

import { SideBySide } from '../components/SideBySide';

export const sideBySide = {
  tag: 'side-by-side',
  Component: SideBySide,
  attributes: {
    appearance: { type: String, matches: ['none', 'box'], default: 'box' }
  }
};
