const path = require('path');
const webpack = require('webpack');
const postCSSConfig = require('./postcss.config');

const customPath = path.join(__dirname, './customPublicPath');

module.exports = {
  entry: {
    spocket: [customPath, path.join(__dirname, '../chrome/extension/spocket')],
    background: [customPath, path.join(__dirname, '../chrome/extension/background')],
    inject: [customPath, path.join(__dirname, '../chrome/extension/inject')]
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  postcss() {
    return postCSSConfig;
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        AUTH_URL: JSON.stringify('https://shopifyauth.now.sh/')
      },
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [/node_modules/, /\.sass$/, /\.scss$/],
      query: {
        presets: ['react-optimize']
      }
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss'
      ]
    },
    { 
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192' 
    },
    {
      test: /\.scss$/,
      loaders: [ "style-loader", "css-loader", "sass-loader"]
    },
  ]
  }
};
