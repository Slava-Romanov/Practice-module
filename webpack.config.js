const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development', //mode: 'development','production'
  entry: {
    bundle: ['whatwg-fetch', path.join(__dirname, '/src/js/index.js')]
  },
  output: {
    path: path.join(__dirname, 'public/practice'),
    filename: '[name].js',//,//.[contenthash]
    publicPath: '/practice/'
  },
  devServer: {
    before: (app, server) => {
      app.get("*", (req, res, next) => {
        console.log(req.url);
        if ( ! (req.url.endsWith(".svg")
            || req.url.endsWith(".js")
            || req.url.endsWith(".ico")
            || req.url.endsWith(".ttf")
            || req.url.endsWith(".woff")
            || req.url.endsWith(".woff2")
            || req.url.endsWith(".js.map")
            || req.url.endsWith(".json")) ) {
          req.url = "/practice/"
        }
        //if (req.url.endsWith(".js"))
        //  req.url = "/main.js"


        next("route");
      });
    },
    contentBase: __dirname + "/public/"
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
        test: /\.(sa|sc|c)ss$/i,
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
          },
          {
            loader: 'sass-loader'
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
              return '[path][name].[ext]';
              //[contenthash].[ext]
          },
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/fonts',
          to: 'fonts'
        },
        {
          from: 'src/generator/data.json',
          to: './data.json'
        }
      ]
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
            // drop_console: true
          }
        }
      }),
    ],
  },
};