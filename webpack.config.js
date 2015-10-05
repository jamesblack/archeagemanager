import Webpack from 'webpack';
import path from 'path';

const appPath = path.resolve(__dirname, 'application');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');

export default {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    path.resolve(appPath, 'main.js'),
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [nodeModulesPath],
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.styl$/,
        loader: 'style!css!stylus',
      },
    ],
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
};
