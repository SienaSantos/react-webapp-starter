var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool : 'eval',
  entry: {
    "app" : "./src/index.js",
    "vendor": [
        'axios',
        'react',
        'redux',
        'react-redux',
        'redux-thunk',
        'semantic-ui-react',
        'react-router',
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      },
      sourceMap: false,
      comments: false,
      include: /\.min\.js$/,
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-decorators-legacy' ],
        presets: ['react', 'es2015', 'stage-1']
      },
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
    {
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader", "sass-loader","postcss-loader" ]
    }
  ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  postcss: function () {
        return [];
  }
};
