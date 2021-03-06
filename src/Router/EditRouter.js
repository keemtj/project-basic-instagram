import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EditProfileContainer from '../Container/Edit/EditProfileContainer';
import EditPasswordContainer from '../Container/Edit/EditPasswordContainer';

const EditRouter = () => {
  return (
    <Switch>
      <Route path="/edit" component={EditProfileContainer} exact />
      <Route path="/edit/password" component={EditPasswordContainer} />
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
