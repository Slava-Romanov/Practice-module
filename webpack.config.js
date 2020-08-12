const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production', //mode: 'development',
  entry: {
    bundle: ['whatwg-fetch', path.join(__dirname, '/src/js/index.js')]
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',//,//.[contenthash]
    publicPath: '/'
  },
  resolve: {
    alias: {
      'react': 'preact',
      'react-dom': 'preact/compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // static
      {
        test: /\.(png|ico|svg|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          context: 'src',
          name(resourcePath, resourceQuery) {
              return 'practice/[path][name].[ext]';
              //[contenthash].[ext]
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      filename: 'index.html'
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: true,
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          }
        }
      }),
    ],
  },
};