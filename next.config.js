const withMarkdoc =
  (pluginOptions = {}) =>
  (nextConfig = {}) => {
    const extension = pluginOptions.extension || /\.md$/;
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        config.module.rules.push({
          test: extension,
          use: [
            // Adding the babel loader enables fast refresh
            options.defaultLoaders.babel,
            {
              loader: require.resolve('./loader'),
            },
          ],
        });

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  };

module.exports = withMarkdoc({})({
  reactStrictMode: true,
  pageExtensions: ['js', 'md'],
  reactStrictMode: true,
});
