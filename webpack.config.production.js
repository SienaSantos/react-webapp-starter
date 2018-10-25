var path = require('path');
var webpack = require('webpack');

var autoprefixer = require('autoprefixer');
var CompressionPlugin = require("compression-webpack-plugin");
var WebpackStrip = require('strip-loader');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// var extractCSS = new ExtractTextPlugin('styles/[name].css');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    "app": './src/index.js',
    "vendor": [
            'axios',
            'react',
            'redux',
            'react-redux',
            'redux-thunk',
            'redux-form',
            'semantic-ui-react',
            'react-router',
    ],
  },
  output: {
   path: path.join(__dirname, 'public'),
   filename: "[name].js"
  },

  plugins: [
    // extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor.bundle.js', 'sa_vendor.bundle.js'],
    //   minChunks : Infinity
    // }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
     mangle: true,
     ecma: 8,
     compress: {
       warnings: false, // Suppress uglification warnings
       pure_getters: true,
       unsafe: true,
       unsafe_comps: true,
       screw_ie8: true,
       drop_console: true
     },
     output: {
       comments: false,
     },
     exclude: [/\.min\.js$/gi] // skip pre-minified libs
   }),
   new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), //https://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })


  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',

        exclude: /node_modules/,
        query: {
          plugins: ['transform-decorators-legacy' ],
          presets: ['react', 'es2015', "es2016", 'stage-1',]
        }
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader","postcss-loader" ]},
      // { test: /\.scss$/i, loader: extractCSS.extract(['css','sass']) },
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.css','.scss']
    }
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  postcss: function () {
        return [];
    }
};
