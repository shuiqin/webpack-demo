/**
 * Created by shuiqin on 2/24/18.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const  webpack = require('webpack');
module.exports = merge(common, {
   devtool: 'inline-source-map',
   devServer: {
    contentBase: './dist'
   },
   plugins:[
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin()
   ]
});