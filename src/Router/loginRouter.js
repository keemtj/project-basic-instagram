import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginBox from '../Component/Login/LoginBox';
import SignUpBox from '../Component/Login/SignUpBox';

const LoginRouter = ({ setSignin }) => {
  return (
    <Switch>
      <Route path="/" exact>
        <LoginBox setSignin={setSignin} />
      </Route>
      <Route path="/login">
        <LoginBox setSignin={setSignin} />
      </Route>
      <Route path="/signup" component={SignUpBox} />
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
