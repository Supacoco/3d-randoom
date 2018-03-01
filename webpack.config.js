const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  NoEmitOnErrorsPlugin
} = require('webpack')

module.exports = () => ({
  entry: './src/main.js',

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve(__dirname, '../src')]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
})
