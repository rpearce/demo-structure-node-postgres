import React from 'react';
import Root from './Root.react';
import Index from './Index.react';
import Example from './Example.react';

const routes = {
  IndexRoute: {
    component: Index
  },
  ExampleRoute: {
    path: 'example',
    component: Example
  },
};

const getChildRoutes = () => {
  let childRoutes = [];
  for (let key in routes) {
    if (key !== 'IndexRoute') {
      childRoutes.push(routes[key]);
    }
  }
  return childRoutes;
};

export const path = (route) => {
  return '/'.concat(routes[route].path || '');
}

export default {
  path: '/',
  component: Root,
  indexRoute: routes.IndexRoute,
  childRoutes: getChildRoutes()
};
