const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        fs: false,
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        process: require.resolve('process/browser') // Add this line to polyfill `process`
      };
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser', // Ensure process is globally available
        }),
      ];
      return webpackConfig;
    },
  },
};
