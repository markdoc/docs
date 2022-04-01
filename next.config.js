const withMarkdoc = require('@markdoc/next.js');

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

module.exports = withMarkdoc()({
  basePath,
  assetPrefix: basePath,
  publicRuntimeConfig: { basePath: basePath || '' },
  reactStrictMode: true,
  pageExtensions: ['js', 'md', 'mdoc']
});
