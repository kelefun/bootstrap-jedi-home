const path = require('path');
const merge = require('webpack-merge');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('./webpack.base');

module.exports = (env, argv) => {
  // console.log('env=' + env + ',argv=' + JSON.stringify(argv));
  let result;
  if (argv.mode === 'development') {//merge 开发环境独有配置
    result = merge(config, {
      devtool: 'inline-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: false,
        host: '0.0.0.0', // 0.0.0.0 localhost
        port: 8088,
      }
    });
  } else {//merge 生产环境独有配置
    result = merge(config, {
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              name: "commons",
              chunks: "initial",
              minChunks: 2
            }
          }
        }
      }
    });
  }
  //merge 公共配置,但vlaue稍有区别
  let mock = argv.mock;
  if(mock){//是否加载mock数据
    // const mockjsFiles = glob.sync(path.resolve(__dirname, 'src') + 'mock/total.mock.js');
    let mockdatajs=path.resolve(__dirname, 'src') + '/mock/total.mock.js';
    result.entry["mockdata"]=mockdatajs;
    // console.log("####打印="+JSON.stringify(result.entry))
  }
  // console.log(result);
  return result;
}; 