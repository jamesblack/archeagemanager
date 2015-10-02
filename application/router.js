import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Route } from 'react-router';

import { Application } from './containers';

export const routes = (
  <Route path='/' component={Application} />
);
