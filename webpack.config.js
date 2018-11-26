const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      { test: /\.(scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: './index.html',
    }),
  ],
};
