const path = require('path');

// TODO finalize this default path
const withMarkdoc =
  ({schemaPath = './markdoc', ...pluginOptions} = {}) =>
  (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        config.module.rules.push({
          test: pluginOptions.extension || /\.md$/,
          use: [
            // Adding the babel loader enables fast refresh
            options.defaultLoaders.babel,
            {
              loader: require.resolve('./loader'),
              options: {
                ...pluginOptions,
                schemaPath: path.resolve(options.dir, schemaPath),
              },
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
