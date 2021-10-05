const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => ({
  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    interface: './src/interface/interface.tsx',
    // ui: './src/ui.tsx',
    worker: './src/worker/worker.ts',
    main: './src/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      ICONS: JSON.stringify(
        fs.readdirSync(path.join(process.cwd(), '../../icons')).map(name => name.split('.')[0]),
      ),
    }),
    new HtmlWebpackPlugin({
      template: './src/interface/interface.html',
      filename: 'interface.html',
      inlineSource: '.(js)$',
      chunks: ['interface'],
    }),
    new HtmlWebpackPlugin({
      template: './src/worker/worker.html',
      filename: 'worker.html',
      inlineSource: '.(js)$',
      chunks: ['worker'],
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/ui.html',
    //   filename: 'ui.html',
    //   inlineSource: '.(js)$',
    //   chunks: ['ui'],
    // }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
});
