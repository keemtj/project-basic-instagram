import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Channel from '../Component/Channel';
import Posts from '../Component/Posts';
import Saved from '../Component/Saved';
import Tagged from '../Component/Tagged';

const ProfileRouter = () => {
  return (
    <Switch>
      <Route path="/profile" component={Posts} exact />
      <Route path="/profile/channel" component={Channel} />
      <Route path="/profile/saved" component={Saved} />
      <Route path="/profile/tagged" component={Tagged} />
      <Route
        render={({ location }) => (
          <div>
            <span>이 페이지는 존재하지 않습니다:</span>
            <span>{` ${location.pathname}`}</span>
          </div>
        )}
      />
    </Switch>
  );
};

export default ProfileRouter;
