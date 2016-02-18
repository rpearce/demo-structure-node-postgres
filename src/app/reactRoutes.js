import React from 'react';
import Root from './Root.react';
import Index from './Index.react';
import SignIn from './sessions/views/SignIn.react';
import CheckEmail from './sessions/views/CheckEmail.react';

const routes = {
  IndexRoute: {
    component: Index
  },
  SignInRoute: {
    path: 'signin',
    component: SignIn
  },
  CheckEmailRoute: {
    path: 'signin/check-email',
    component: CheckEmail
  }
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
