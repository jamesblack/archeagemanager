import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Route, IndexRoute } from 'react-router';

import { Application } from './containers';
import { Home, Professions } from './components';

export const routes = (
  <Route path='/' component={Application}>
    <IndexRoute component={Home} />
    <Route path='/professions' component={Professions} />
  </Route>
);
