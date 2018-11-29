const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = {};
const jsFiles = glob.sync(path.resolve(__dirname, 'src') + '/pages/**/*.js');
jsFiles.forEach(entry => {
  console.log("遍历entry=" + entry)
  var end = entry.lastIndexOf(".");
  let start = entry.lastIndexOf("/");
  if (start < 0) { start = entry.lastIndexOf("\\") }
  let name = entry.substring(start + 1, end);
  entries[name] = entry;
});
const htmlFiles = glob.sync(path.resolve(__dirname, 'src') + '/pages/**/*.html');
const htmls = htmlFiles.map(html => {
  let start = html.lastIndexOf("/");
  let name = html.substring(start + 1);
//TODO 需要指定 js
  return new HtmlWebpackPlugin({
    minify: false,
    template: html,
    filename:name,
    loader: 'html-loader',
    favicon: '../favicon.ico'
  })
});
module.exports = {
  // absolute path for project root
  context: path.resolve(__dirname, 'src'),
  entry: entries,
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
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
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
  ].concat(htmls),
};