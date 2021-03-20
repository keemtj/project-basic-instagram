import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginBox from '../Component/LoginBox';
import SignUpBox from '../Component/SignUpBox';

const LoginRouter = () => {
  return (
    <Switch>
      <Route path="/" component={LoginBox} exact />
      <Route path="/login" component={LoginBox} />
      <Route path="/signup" component={SignUpBox} />
      <Route
        render={({ location }) => (
          <div style={{ marginTop: '5rem' }}>
            <span>이 페이지는 존재하지 않습니다:</span>
            <span>{` ${location.pathname}`}</span>
          </div>
        )}
      />
    </Switch>
  );
};

export default LoginRouter;
