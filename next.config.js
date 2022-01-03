const withMarkdoc = require('@stripe-internal/next-markdoc');

module.exports = withMarkdoc()({
  reactStrictMode: true,
  pageExtensions: ['js', 'md', 'mdoc'],
});
