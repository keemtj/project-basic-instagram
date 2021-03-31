import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import DirectPage from '../Pages/DirectPage';
import NewPostPage from '../Pages/NewPostPage';
import ProfilePage from '../Pages/ProfilePage';

const MainRouter = () => {
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/direct" component={DirectPage} />
      <Route path="/new" component={NewPostPage} />
      <Route path="/profile" component={ProfilePage} />
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
