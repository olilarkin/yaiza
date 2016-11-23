'use strict';

var webpack = require('webpack');
var path = require('path');
var WebpackOnBuildPlugin = require('on-build-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});
var exec = require('child_process').exec;
var execErrorHandler = function(error, stdout, stderr) {
  if (error) {
    console.log('Error: ', error, stderr);
  }
  console.log(stdout);
};
var plugins = [];

plugins.unshift(HTMLWebpackPluginConfig);

var pkg = require('./package.json');
var version = pkg.version;

plugins.push(new WebpackOnBuildPlugin(function() {
  console.log('*****WEBPACK COMPILED*****');
}));

module.exports = {
  entry: {
    'app.js': './src/app.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'app_bundle.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.modernizrrc$/,
        loader: 'modernizr'
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, './.modernizrrc')
    },
    extensions: ['', '.js', '.jsx', '.json']
  }
};
