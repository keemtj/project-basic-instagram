import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsContainer from '../Container/Profile/PostsContainer';
import Saved from '../Component/Profile/Saved';
import Heart from '../Component/Profile/Heart';

const ProfileRouter = ({ watchName }) => {
  return (
    <Switch>
      <Route path={`/:${watchName}`} exact>
        <PostsContainer watchName={watchName} />
      </Route>
      <Route path={`/:${watchName}/saved`} component={Saved} />
      <Route path={`/:${watchName}/heart`} component={Heart} />
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
