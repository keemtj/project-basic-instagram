import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsContainer from '../Container/Profile/PostsContainer';
import BookmarkContainer from '../Container/Profile/BookmarkContainer';
import HeartContainer from '../Container/Profile/HeartContainer';

const ProfileRouter = ({ watchName, displayName }) => {
  return (
    <Switch>
      <Route path={`/:displayName`} exact>
        <PostsContainer watchName={watchName} />
      </Route>
      {watchName === displayName && (
        <Route path={`/:displayName/saved`} component={BookmarkContainer} />
      )}
      {watchName === displayName && (
        <Route path={`/:displayName/heart`} component={HeartContainer} />
      )}
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
