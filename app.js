import express from 'express';
import env from 'envs';
import * as bootstrap from './bootstrap';

// import passport from 'passport';

const app = express();
const port = env('PORT', 3000);

runBootstrap();

async function runBootstrap() {
  try {
    // bootstrap.mongo(app);
    bootstrap.server(app);
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
