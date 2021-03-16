import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './containers/Login';
import Chat from './containers/Chat';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/chat" component={Chat} />
  </Switch>
);
