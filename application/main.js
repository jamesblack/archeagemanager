import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router } from 'react-router';
import { routes } from './router';
import { Application } from './containers';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import archeageStore from './redux';
require('./TEMP_CSS/main.styl');

const routing = (
  <Provider store={archeageStore}>
    <Router history={createBrowserHistory()}>
      {routes}
    </Router>
  </Provider>
);

render(routing, document.getElementById('application'));

console.log('Application is loaded!');
