const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc()({
  reactStrictMode: true,
  pageExtensions: ['js', 'md', 'mdoc'],
  rewrites() {
    return [
      {
        source: '/spec',
        destination: '/spec.html'
      }
    ];
  }
});
