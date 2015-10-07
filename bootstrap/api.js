import debugLib from 'debug';
import env from 'envs';
import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';

Promise.promisifyAll(fs);

const debug = debugLib('Bootstrap:Api');

export default async function api(app, passport) {
  debug('Start Bootstrapping Api');

  let apiFiles = await fs.readdirAsync(path.resolve(__dirname, '../api'));

  apiFiles.forEach((file) => {
    let router = require(path.resolve(__dirname, `../api/${file}`));
    if (!!~file.indexOf('.js')) app.use('/api', router);
  });
}
