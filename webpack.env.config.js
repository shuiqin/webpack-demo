/**
 * Created by shuiqin on 2/27/18.
 */
"use strict";

module.exports = env => {
  console.log('Node_env', env.NODE_ENV);
  console.log('Production', env.production);
  var configMap = {
      "dev":()=>require("./webpack/webpack.dev.config"),
      "beta":()=>require("./webpack/webpack.beta.config"),
      "ppe":()=>require("./webpack/webpack.prod.config"),
      "product":()=>require("./webpack/webpack.prod.config")
  };
  return configMap[env] && configMap[env]() || configMap.dev();
}