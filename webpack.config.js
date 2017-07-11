var webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', './index.js'],

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: process.env.NODE_ENV === 'production'
    ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.ProvidePlugin({ Flickity: 'flickity' }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
    : [
      new webpack.DefinePlugin({ 'process.env': { APP_ENV: JSON.stringify('browser') } }),
      new webpack.ProvidePlugin({ Flickity: 'flickity' })
    ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /flickity/,
        loader: 'imports?define=>false&this=>window'
      },
      {
        test: /\.json$/,
        loader: 'json'
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
  }
}
