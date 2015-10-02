import debugLib from 'debug';
import env from 'envs';
import mongoose from 'mongoose';

// const User = mongoose.model('User');

// console.log(User);

const debug = debugLib('Bootstrap:Passport');

export default function passport(app, passport) {
  debug('Start Bootstrapping Passport');
}
