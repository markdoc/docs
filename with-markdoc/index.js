const withMarkdoc =
  (pluginOptions = {}) =>
  (nextConfig = {}) => {
    const extension = pluginOptions.extension || /\.md$/;
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        // Fixes npm packages that depend on `fs` module
        config.resolve.fallback = {fs: false, path: false};
        config.module.rules.push({
          test: extension,
          use: [
            // Adding the babel loader enables fast refresh
            // options.defaultLoaders.babel,
            {
              loader: require.resolve('./loader'),
              options: pluginOptions,
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

module.exports = withMarkdoc;
