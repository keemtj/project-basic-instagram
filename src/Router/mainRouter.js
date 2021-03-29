import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Component/Main/Main';
import Direct from '../Component/Direct/Direct';
import Explore from '../Component/Explore/Explore';
import Profile from '../Component/Profile/Profile';
import Login from '../Component/Login/Login';

const MainRouter = ({ setSignin }) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Main setSignin={setSignin} />
      </Route>
      <Route path="/direct" component={Direct} />
      <Route path="/explore" component={Explore} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
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

export default MainRouter;
