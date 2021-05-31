import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsContainer from '../Container/Profile/PostsContainer';
import SavedContainer from '../Container/Profile/SavedContainer';
import HeartContainer from '../Container/Profile/HeartContainer';

const ProfileRouter = ({ watchName }) => {
  return (
    <Switch>
      <Route path={`/:${watchName}`} exact>
        <PostsContainer watchName={watchName} />
      </Route>
      <Route path={`/:${watchName}/saved`} component={SavedContainer} />
      <Route path={`/:${watchName}/heart`} component={HeartContainer} />
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
