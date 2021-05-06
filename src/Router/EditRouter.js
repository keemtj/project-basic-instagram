import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EditProfile from '../Component/Edit/EditProfile';
import EditPassword from '../Component/Edit/EditPassword';

const EditRouter = () => {
  return (
    <Switch>
      <Route path="/edit/" component={EditProfile} exact />
      <Route path="/edit/password" component={EditPassword} />
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

export default EditRouter;
