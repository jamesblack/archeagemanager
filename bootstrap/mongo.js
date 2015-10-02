import debugLib from 'debug';
import env from 'envs';
import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

Promise.promisifyAll(fs);

const debug = debugLib('Bootstrap:Mongoose');

export default async function mongo(app, passport) {
  debug('Start Bootstrapping Mongoose');

  let connect = () => {
    mongoose.connect(env('MONGO'), {
      server: {
        socketOptions: {
          keepAlive: 1,
        },
      },
    });
  };

  connect();

  mongoose.connection.on('error', console.error);
  mongoose.connection.on('disconnect', connect);

  let modelFiles = await fs.readdirAsync(path.resolve(__dirname, '../models'));

  modelFiles.forEach((file) => {
    if (!!~file.indexOf('.js')) require(path.resolve(__dirname, `../models/${file}`));
  });
}
