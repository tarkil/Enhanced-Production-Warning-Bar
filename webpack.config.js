/* eslint-disable */


const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const config = {
  entry: { 
    content: path.resolve(__dirname, './src/js/content.js'),
    'application-bundle': path.resolve(__dirname, './src/js/application.jsx')
  },
  output: {
    path: __dirname + "/build/js",
    filename: '[name].js',
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.js(x)?$/,
        use: [{
          loader: "babel-loader"
        }],
        exclude: /(node_modules|test\.js|\.spec\.js(x)?$)/,
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
          ],
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};

module.exports = config;