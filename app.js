import express from 'express';
import env from 'envs';
import bootstrap from './bootstrap';

const app = express();
const port = env('PORT', 3000);

runBootstrap();

async function runBootstrap() {
  try {
    await bootstrap.mongo(app);
    bootstrap.server(app);
    bootstrap.api(app);
    await bootstrap.webpack(app);
    await bootstrap.stormpath(app);
    bootstrap.client(app);
  } catch (exception) {
    console.error(exception);
  }

  app.listen(port, () => {
    console.log(`Listening for connections on port ${port}`);
  });
};
