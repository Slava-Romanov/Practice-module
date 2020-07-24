const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.join(__dirname, '/src/js/index.js'),
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'//,//.[contenthash]
    //publicPath: '/'
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
              sourceMap: true
            }
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
          name(resourcePath, resourceQuery) {
              return 'images/' + '[name].[ext]';
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
};