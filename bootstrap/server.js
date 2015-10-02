import debugLib from 'debug';
import env from 'envs';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import express from 'express';

const debug = debugLib('Bootstrap:Server');

export default function server(app, passport) {
  debug('Start Bootstrapping Server');

  app.set('view engine', 'jade');

  app.use(express.static(path.resolve(__dirname, '../public')));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cookieParser(env('COOKIE_SECRET', 'what would you do if you were a rogue?')));
  app.use(cookieSession({ secret: env('COOKIE_SECRET', 'what would you do if you were a rogue?') }));

  app.use(morgan('dev'));
}
