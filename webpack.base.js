const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getEntries = (scope) => {
  let entries = {};
  let jsFiles = glob.sync(path.resolve(__dirname, 'src') + '/pages/**/' + scope+'.js');
  jsFiles.forEach(entry => {
    var end = entry.lastIndexOf(".");
    let start = entry.lastIndexOf("/");
    if (start < 0) { start = entry.lastIndexOf("\\") }
    let name = entry.substring(start + 1, end);
    entries[name] = entry;
  });
  return entries;
}
const getHtmls = (scope) => {
  let htmlFiles = glob.sync(path.resolve(__dirname, 'src') + '/pages/**/' + scope+'.html');
  return htmlFiles.map(html => {
    let start = html.lastIndexOf("/");
    var end = html.lastIndexOf(".");
    let name = html.substring(start + 1);
    let chunkName = html.substring(start + 1, end);
    return new HtmlWebpackPlugin({
      minify: false,
      template: html,
      filename: name,
      chunks: [chunkName, 'commons', 'mockdata'],
      loader: 'html-loader',
      favicon: '../favicon.ico'
    })
  });
}

let result = {
  // absolute path for project root
  context: path.resolve(__dirname, 'src'),
  output: {
    // absolute path declaration
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      // babel-loader with 'env' preset
      { test: /\.js$/, include: /src/, exclude: /node_modules/, use: { loader: "babel-loader", options: { presets: ['env'] } } },
      // html-loader
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //     },
      //   ]
      // },
      // url-loader(for images)
      { test: /\.(jpg|png|gif|svg)$/, use: [{ loader: 'url-loader', options: { limit: 5120, name: '[name].[ext]', outputPath: './assets/media/' } }] },
      // file-loader(for fonts)
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }, {
        test: /\.art$/,
        loader: "art-template-loader",
        options: {
          // art-template options (if necessary)
          // @see https://github.com/aui/art-template
        }
      }
    ]
  },
  plugins: [
    // cleaning up only 'dist' folder
    new CleanWebpackPlugin(['dist']),
    //提取css注入到html中
    new MiniCssExtractPlugin({
      filename: "./assets/css/[name].[hash].css",
      chunkFilename: "./assets/css/[id].[hash].css"
    }),
  ],
};

module.exports = (argv) => {
  let scope = argv.scope;
  if (scope === undefined) {
    scope = '*'
  }
 result['entry']=getEntries(scope);
 result['plugins']=result['plugins'].concat(getHtmls(scope));
//  console.log("返回结果="+JSON.stringify(result));
 return result;
}