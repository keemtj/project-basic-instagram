import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Component/Home';
import Direct from '../Component/Direct';
import Explore from '../Component/Explore';
import User from '../Component/User';

const MainRouter = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/direct" component={Direct} />
      <Route path="/explore" component={Explore} />
      <Route path="/user" component={User} />
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
