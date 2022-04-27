const Markdoc = require('@markdoc/markdoc');

const source = '# Markdoc';
const ast = Markdoc.parse(source);
const content = Markdoc.transform(ast);

console.log(Markdoc.renderers.html(content));
