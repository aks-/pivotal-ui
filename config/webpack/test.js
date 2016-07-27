import puiAliases from '../../helpers/pui-aliases';

export default {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2015", "react", "stage-2"]
        }
      }
    ]
  },
  output: {filename: 'spec.js' },
  quiet: true,
  resolve: {
    alias: Object.assign({
      'raf': `${__dirname}/../../spec/pivotal-ui-react/support/mock_raf.js`,
      'performance-now': `${__dirname}/../../spec/pivotal-ui-react/support/mock_performance_now.js`,
      'lodash.throttle': `${__dirname}/../../spec/pivotal-ui-react/support/mock_throttle.js`
    }, puiAliases)
  }
};
