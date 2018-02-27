##1) 用webpack打包##
js引入顺序
管理js依赖

npm install --save lodash
##2) 目录介绍##
src 编辑修改代码的目录
dist 浏览器直接加载的目录
##3) dis目录生成  命令行直接生成#
npx webpack src/index.js dist/bundle.js
##4) 引入配置文件webpack.config.js ###
npx webpack --config webpack.config.js
默认读取webpack.config.js
可直接 跑npx webpack
###5) package.json##
"build": "webpack"
npm run build 可以替代  npx webpack --config webpack.config.js

###1) assert management###
  *** css style loader ***
 npm install --save-dev style-loader css-loader

  ***  file loader ***
  ***  data loader *** 
  csv xml json ...
  xml-loader , csv-loader
  
 ###  output management ###
 管理打包输出 分多个文件
 
 ###html-webpack-plugin 自动生成html页面并引用相关bundle##
  npm install html-webpack-plugin --save-dev
 解决bundle.js更名增减问题 自动生成html页面并引用相关bundle
 基本用法
 `
 var HtmlWebpackPlugin = require('html-webpack-plugin');
 var path = require('path');
 
 var webpackConfig = {
   entry: 'index.js',
   output: {
     path: path.resolve(__dirname, './dist'),
     filename: 'index_bundle.js'
   },
   plugins: [new HtmlWebpackPlugin()]
 };
 `
 ###dist 目录管理 clean-webpack-plugin##
      使用参考webpack.config.js
       var CleanWebpackPlugin = require('clean-webpack-plugin');
 +     new CleanWebpackPlugin(['dist']),
 每次build前先清空
 npm install clean-webpack-plugin --save-dev
 
 ###开发环境部署development  https://webpack.js.org/guides/development/###
 1) sourceMap
    devtool: 'inline-source-map',
  https://webpack.js.org/configuration/devtool/
  
  There are a couple of different options available in webpack that help you automatically compile your code whenever it changes:
  
  webpack's Watch Mode         
        "watch": "webpack --watch"  package.json  缺点 必须要刷新页面才能看到效果  自动生效用webpack-dev-server
        1) npm run watch 
  webpack-dev-server
        "start": "webpack-dev-server --open"
        1) npm install --save-dev webpack-dev-server
        2) npm run start
  webpack-dev-middleware
        webpack-dev-middleware(webpack-dev-server内部使用该中间件)配合express服务 定制 
        1) npm install --save-dev express webpack-dev-middleware
        2) publicPath: '/'  (webpack.config.js)
           The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000, the port number we'll specify later. The next step is setting up our custom express server:
        3)添加server.js
        4) node server.js
        
  ### HotModuleReplacement 热替换### 
       1) server 使用express实现热替换
       2) dev-server-node 使用node实现热替换
       
       
 ### Tree shaking #####
 math 
 npm install --save-dev uglifyjs-webpack-plugin
 ***file webpack.config.js  压缩 去重跟无用代码***
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
new UglifyJSPlugin()

####production 生产环境###
 
/webpack
使用 webpack-merge merge配置
npm install --save-dev webpack-merge

***生产环境 生成sourcemap  方便定位错误******
  devtool: 'source-map',
  
  new UglifyJSPlugin({
         sourceMap: true
       })

Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance.
***生产环境 生成sourcemap  ******


***用户指定环境 process.env.NODE_ENV 这个是node内部变量***
     指定环境变量
     new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
     })
       
###output分离css###     

  npm install --save-dev extract-text-webpack-plugin
  
  1)
            use: [
               'style-loader',
               'css-loader'
             ],
             
             替换成
             use: ExtractTextPlugin.extract({
               fallback: "style-loader",
               use: "css-loader"
             })
  2)     new ExtractTextPlugin("styles.css"),

###node版本管理###  
npm install -g n  安装node版本管理工具
n stable  安装稳定版node

npm install -g npm 自动更新npm

###code spliting 和去重###
index.js 和 print都引用啦loadash
1)
使用CommonsChunkPlugin 去重
new webpack.optimize.CommonsChunkPlugin({
          name: 'common' // Specify the common bundle's name.
 })
 2) 动态引入
     chunkFilename: '[name].bundle.js',

###Bundle Analysis### 
1) 
npm install --save-dev  webpack-visualizer-plugin
    new Visualizer()

生成stats.html查看

2)
https://alexkuz.github.io/webpack-chart/
生成stats.json并在上面页面上传分析
$ webpack --profile --json > stats.json  

###Lazy loading###
将print.js改成lazy loading 。 
生成0.bundle.js
配置如下
    chunkFilename: '[name].bundle.js',

###Caching  配置  https://webpack.js.org/guides/caching/ issues:自己这边跑下来hash会变##
1) 这个不保险 再跑一次会变文件名
+     filename: '[name].[chunkhash].js',
有新文件引入会改变hash需加下面代码
+     new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor' // Specify the common bundle's name.
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

###auther ###
  library: 'webpackdemo', // npm输出 https://webpack.js.org/guides/author-libraries/
    libraryTarget: 'umd'
  },
  externals: {  //对外部的依赖
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
  
  `注: 写自己npm包的时候
   ` make " module.exports = { " instead of " export default { "
  
  ##全局变量###
  new webpack.ProvidePlugin({
        _: 'lodash'
       })
       
       ###两个不能同时存在 external应用场景???? ####
       externals: { //作为组件被引用时 依赖外部lodash
           lodash: {
             commonjs: 'lodash',
             commonjs2: 'lodash',
             amd: 'lodash',
             root: '_'
           }
         },
         
  ###Global exports全局变量导出###
          {
                 test: require.resolve('../src/globals.js'),
                 use: 'exports-loader?file,parse=helpers.parse'
               }
               
               
 ###改版本 npm 命令###
 npm version patch <=> z++
 npm version minor <=> y++ && z=0
 npm version major <=> x+= && y=0 && z=0
 
 如果npm包同时又是一个git仓库，在运行了npm version <update_type>和npm publish之后，
 npm会自动给git仓库打上一个跟当前版本号一样的tag，对于挂在github上的npm包很有用。