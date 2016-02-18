import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../app/reactRoutes';
import app from './index';

const matchRoute = (req, res, next) => {
  const location = req.path;
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let componentHTML = renderToString(<RoutingContext { ...renderProps } />),
          html = `<!DOCTYPE html>${componentHTML}`;
      res.status(200).send(html);
    } else {
      res.status(404).send('Not found');
    }
  });
}

export default matchRoute;
