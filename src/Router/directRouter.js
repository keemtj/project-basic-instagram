import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewChat from '../Component/Direct/NewChat';
import Chat from '../Component/Direct/Chat';

const DirectRouter = () => {
  return (
    <Switch>
      <Route path="/direct/" component={NewChat} exact />
      <Route path="/direct/:username" component={Chat} />
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

export default DirectRouter;
