const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PATHS = {
  srcDir: path.join(__dirname, 'js'),
  outputDir: path.join(__dirname, 'build')
};


module.exports = {
  context: PATHS.srcDir,
  entry: './index.js',
  output: {
    path: path.join(PATHS.outputDir),
    publicPath: PATHS.outputDir,
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('main.css',  { allChunks: true } ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  }
};
