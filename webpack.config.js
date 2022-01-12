const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputPath = path.join(__dirname, './dist/client');

module.exports = {
  entry: {
    client: ['babel-polyfill', './src/client/js/index.ts']
  },
  output: {
    path: outputPath,
    filename: './js/[name].webpack.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          path.join(__dirname, './src/client/vendor'),
        ],
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: [
          /node_modules/,
          path.join(__dirname, './src/client/vendor'),
        ],
        use: [
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.join(__dirname, './src/client/vendor'),
        ],
        enforce: 'pre',
        use: [
          { loader: 'source-map-loader' }
        ]
      },
      {
        test: /\.(css|less)$/,
        exclude: [
          /node_modules/,
          path.join(__dirname, './src/client/vendor'),
        ],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
                noIeCompat: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        exclude: [
          /node_modules/,
          path.join(__dirname, './src/client/vendor'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json', '.less']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      favicon: './src/client/favicon.ico'
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/client/css', to: 'css' },
        { from: './src/client/img', to: 'img' },
        { from: './src/client/vendor', to: 'vendor' },
        { from: './node_modules/bootstrap', to: 'vendor/bootstrap' },
        { from: './node_modules/@fortawesome/fontawesome-free', to: 'vendor/fontawesome-free' },
      ]
    })
  ]
};
