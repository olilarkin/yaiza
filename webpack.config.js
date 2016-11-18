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

// This removes the locale strings from Moment.js to reduce the file size on minification
var squishMoment = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

var minifyReact = new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }); // This has effect on the react lib size
var dedupePlugin = new webpack.optimize.DedupePlugin();
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    properties: true,
    sequences: true,
    dead_code: true,
    conditionals: true,
    comparisons: true,
    evaluate: true,
    booleans: true,
    unused: true,
    loops: true,
    hoist_funs: true,
    cascade: true,
    if_return: true,
    join_vars: true,
    drop_debugger: true,
    unsafe: true,
    hoist_vars: true,
    negate_iife: true
  },
  sourceMap: true,
  mangle: {
    toplevel: false,
    sort: false,
    eval: false,
    properties: false
  },
  output: {
    space_colon: false,
    comments: false
  }
});

plugins.unshift(HTMLWebpackPluginConfig, minifyReact, dedupePlugin, uglifyPlugin, squishMoment);

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
