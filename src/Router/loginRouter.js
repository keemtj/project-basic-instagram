import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';

const LoginRouter = () => {
  console.log('login router');
  return (
    <Switch>
      {/* <Route path="/" component={LoginPage} exact /> */}
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  );
};

export default LoginRouter;
