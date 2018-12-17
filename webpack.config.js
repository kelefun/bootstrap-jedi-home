const path = require('path');
const merge = require('webpack-merge');
const baseConfigFunc = require('./webpack.base');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  // console.log('env=' + env + ',argv=' + JSON.stringify(argv));
  
  let result,baseConfig=baseConfigFunc(argv);
  if (argv.mode === 'development') {
    result = merge(baseConfig, devConfig);//merge 开发环境
  } else {
    result = merge(baseConfig, prodConfig);//merge 生产环境
  }
  //merge 公共配置
  if (argv.mock) {//是否加载mock数据
    let mockdatajs = path.resolve(__dirname, 'src') + '/mock/total.mock.js';
    result.entry["mockdata"] = mockdatajs;
    // console.log("####打印="+JSON.stringify(result.entry))
  }
  console.log("####打印=" + argv.scope);
  // console.log(result);
  return result;
}; 