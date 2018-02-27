/**
 * Created by shuiqin on 2/24/18.
 */
/**
 * Created by shuiqin on 2/22/18.
 */
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
var WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    app_dynamic:'./src/index_import.js',
    app_anyc:'./src/index_aync.js',
    vendor: [
           'lodash'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new ExtractTextPlugin({
      filename:'style.css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor' // Specify the common bundle's name.
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new Visualizer(),
    new webpack.ProvidePlugin({
      _: 'lodash',
      join: ['lodash', 'join']
    }),
    new WorkboxPlugin({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  output: {
      filename:'[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
    library: 'webpackdemo', // npm输出 https://webpack.js.org/guides/author-libraries/
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
        {
           test: require.resolve('webpack-print'),
           use: 'imports-loader?this=>window'
      },
      {
        test: require.resolve('../src/globals.js'),
        use: 'exports-loader?file,parse=helpers.parse'
      }
    ]
  }
};