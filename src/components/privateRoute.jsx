import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { useAuth } from './useAuth';

import LogIn  from './LogInPage';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  let auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.user.isAuthenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <LogIn />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);