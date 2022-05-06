import markdocExample from './markdoc-example.markdoc';
import sideBySide from './side-by-side.markdoc';

export { comment } from '@markdoc/next.js/tags';

// IDEA: use export default {}
export { default as ascii } from './ascii.markdoc';
export { default as callout } from './callout.markdoc';
export { default as diagram } from './diagram.markdoc';
export { default as features } from './features.markdoc';
export { default as icon } from './icon.markdoc';
export { default as item } from './item.markdoc';
module.exports['markdoc-example'] = markdocExample;
export { default as example } from './markdoc-example.markdoc';
export { default as sandbox } from './sandbox.markdoc';
export { default as section } from './section.markdoc';
module.exports['side-by-side'] = sideBySide;
export { default as typewriter } from './typewriter.markdoc';
export { default as youtube } from './youtube.markdoc';
