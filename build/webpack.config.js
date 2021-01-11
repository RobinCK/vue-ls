const webpack = require('webpack');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        TRANSITION_DURATION: 50,
        TRANSITION_BUFFER: 10
      }
    })
  ],
  devtool: 'inline-source-map'
};
