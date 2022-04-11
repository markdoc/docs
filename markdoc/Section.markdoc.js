// @flow

import { Section } from '../components/Section';

export const section = {
  tag: 'section',
  Component: Section,
  attributes: {
    background: { type: String },
    className: { type: String }
  }
};
