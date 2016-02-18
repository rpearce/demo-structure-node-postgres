import React, { Component } from 'react';
import { Link } from 'react-router';
import { path } from './reactRoutes';

const Root = ({ children }) => {
  const { title, description } = children.type.meta;
  //<script src="/app.js" async></script>
  return (
    <html lang="en">
      <head>
        <title>{ title }</title>
        <meta property="description" content={ description } />
      </head>
      <body>
        <header role="header">
          <nav role="navigation">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to={ path('SignInRoute') }>Sign In</Link></li>
            </ul>
          </nav>
        </header>
        { children }
      </body>
    </html>
  );
};

export default Root;
