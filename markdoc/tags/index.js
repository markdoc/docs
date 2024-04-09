import { tags } from '@markdoc/markdoc';
import { comment } from '@markdoc/next.js/tags';

import ascii from './ascii.markdoc';
import callout from './callout.markdoc';
import code from './code.markdoc';
import diagram from './diagram.markdoc';
import features from './features.markdoc';
import icon from './icon.markdoc';
import item from './item.markdoc';
import markdocExample from './markdoc-example.markdoc';
import sandbox from './sandbox.markdoc';
import section from './section.markdoc';
import sideBySide from './side-by-side.markdoc';
import typewriter from './typewriter.markdoc';
import youtube from './youtube.markdoc';

export default {
  ascii,
  callout,
  code,
  comment,
  diagram,
  features,
  icon,
  item,
  example: markdocExample,
  'markdoc-example': markdocExample,
  partial: {
    ...tags.partial,
    inline: undefined
  },
  sandbox,
  section,
  'side-by-side': sideBySide,
  table: {
    ...tags.table,
    inline: undefined
  },
  typewriter,
  youtube
};
