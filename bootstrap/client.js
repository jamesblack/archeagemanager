import debugLib from 'debug';
import React from 'react';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import { routes } from '../application/router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import getStoreInstance from '../application/redux';
import { setUser } from '../application/redux/actions/user';

const debug = debugLib('Bootstrap:Client');

export default function client(app) {
  debug('Start Bootstrapping Client');

  app.get('*', (req, res) => {
    const store = getStoreInstance();
    if (req.user) store.dispatch(setUser(req.user));

    let location = createLocation(req.url);

    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      if (error) return res.status(500).send(error.message);
      if (renderProps === null) return res.sendStatus(404);
      return res.render('../public/index', {
        app: renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
        ),
        initialState: store.getState(),
      });
    });

  });
}
