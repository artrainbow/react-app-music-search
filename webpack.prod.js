const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { imageminLoader } = require('imagemin-webpack');
const imageminGifsicle = require('imagemin-gifsicle');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist'], { verbose: false }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
});
