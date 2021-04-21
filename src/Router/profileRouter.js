import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Channel from '../Component/Profile/Channel';
import Posts from '../Component/Profile/Posts';
import Saved from '../Component/Profile/Saved';
import Tagged from '../Component/Profile/Tagged';

const ProfileRouter = ({ watchName }) => {
  return (
    <Switch>
      <Route path={`/:${watchName}`} component={Posts} exact />
      <Route path={`/:${watchName}/channel`} component={Channel} />
      <Route path={`/:${watchName}/saved`} component={Saved} />
      <Route path={`/:${watchName}/tagged`} component={Tagged} />
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
