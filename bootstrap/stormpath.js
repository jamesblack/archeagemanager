import debugLib from 'debug';
import env from 'envs';
import sp from 'express-stormpath';

const debug = debugLib('Bootstrap:Stormpath');

export default async function stormpath(app) {
  debug('Start Bootstrapping Stormpath');

  app.use(sp.init(app, {
    website: true,
    web: {
      idSite: {
        enabled: true,
      },
    },
  }));

  await onStormpathReady(app);
  return;
}

async function onStormpathReady(app) {
  return new Promise((resolve) => {
    app.on('stormpath.ready', () => {
      console.log('stormpath.ready');
      return resolve();
    });
  });
}
