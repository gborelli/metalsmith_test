const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PATHS = {
  srcDir: path.join(__dirname, 'js'),
  outputDir: path.join(__dirname, 'build', 'assets')
};

const PROD_MODE = process.env.NODE_ENV == 'production' ? true : false;

var config = {
  context: PATHS.srcDir,
  entry: [
    // '!!script!jquery/dist/jquery.min.js',
    // '!!script!foundation-sites/dist/foundation.js',
    './index.js'
  ],
  // externals: {
  //   jquery: "jQuery",
  //   foundation: 'Foundation'
  // },
  output: {
    path: PATHS.outputDir,
    publicPath: './',
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
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss-loader!sass-loader'
        )
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.ico$|\.jpe?g$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ]
  },
  postcss: function () {
    return [autoprefixer]
  }
};

if (! PROD_MODE) {
  config.devtool = "source-map", // or "inline-source-map"
  config.module.loaders[0].loader = ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap'
  )
}


module.exports = config
