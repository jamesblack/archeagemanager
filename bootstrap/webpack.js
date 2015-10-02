import debugLib from 'debug';
import env from 'envs';
import httpProxy from 'http-proxy';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config';
import path from 'path';

const mainPath = path.resolve(__dirname, '..', 'application', 'main.js');
const debug = debugLib('Bootstrap:Webpack');
const proxy = httpProxy.createProxyServer();

export default async function(app, passport) {
  debug('Start Bootstrapping Webpack');
  if (env('NODE_ENV') === 'development') {
    await startBundler();
    await startBundleProxy(app);
  }

  return;
}

async function startBundleProxy(app) {
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:3000',
    });
  });

  proxy.on('error', (e) => {
    console.error(`Proxy Error: ${e}`);
  });

  return;
}

async function startBundler() {
  return new Promise((resolve) => {
    let bundleStart = null;
    let compiler = webpack(webpackConfig);

    compiler.plugin('compile', () => {
      console.log('Bundling...');
      bundleStart = Date.now();
    });

    compiler.plugin('done', () => {
      console.log(`Bundled in ${(Date.now() - bundleStart)}ms!`);
    });

    let bundler = new WebpackDevServer(compiler, {
      publicPath: '/build/',
      hot: true,
      quiet: false,
      noInfo: true,
      stats: {
        colors: true,
      },
    });

    bundler.listen(3000, 'localhost', () => {
      console.log('Bundling Project, please wait...');
      return resolve();
    });
  });
}
