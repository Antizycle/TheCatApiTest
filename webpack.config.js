/* eslint-disable @typescript-eslint/no-var-requires */
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  // devtool: "inline-source-map",
  devServer: {
    hot: false,
    liveReload: false,
    static: {       
      directory: path.resolve(__dirname, './dist')
    }
  },
  module: {
    rules: [
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, 
        type: "asset/resource"
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
    
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', 'json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
        template: "./public/index.html",
        inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
}