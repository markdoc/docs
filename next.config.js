const withMarkdoc = require('./with-markdoc');

module.exports = withMarkdoc()({
  reactStrictMode: true,
  pageExtensions: ['js', 'md'],
});
