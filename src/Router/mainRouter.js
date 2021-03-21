import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Component/Main';
import Direct from '../Component/Direct';
import Explore from '../Component/Explore';
import Profile from '../Component/Profile';
import Login from '../Component/Login';

const MainRouter = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/direct" component={Direct} />
      <Route path="/explore" component={Explore} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
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

export default MainRouter;
