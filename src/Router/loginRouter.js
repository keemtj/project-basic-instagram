import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import LoadingPage from '../Pages/LoadingPage';

const LoginRouter = () => {
  return (
    <Switch>
      <Route path="/" component={LoginPage} exact />
      <Route path="/signup" component={SignupPage} />
      <Route render={() => <LoadingPage />} />
      <Route
        render={({ location }) => (
          <div style={{ marginTop: '5.5rem' }}>
            <span>이 페이지는 존재하지 않습니다:</span>
            <span>{` ${location.pathname}`}</span>
          </div>
        )}
      />
    </Switch>
  );
};

export default LoginRouter;
