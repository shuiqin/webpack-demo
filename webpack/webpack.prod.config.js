/**
 * Created by shuiqin on 2/24/18.
 */
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
     new UglifyJSPlugin({
       sourceMap: true
     }),
    new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
    })
   ]
});