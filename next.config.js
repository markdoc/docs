const withMarkdoc = require('./with-markdoc');
const schema = require('./schema');

module.exports = withMarkdoc({schema})({
  reactStrictMode: true,
  pageExtensions: ['js', 'md'],
});
