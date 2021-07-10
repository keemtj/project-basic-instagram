import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import MessagesContainer from '../Container/Direct/MessagesContainer';
import NewDirectContainer from '../Container/Direct/NewDirectContainer';
import { firebaseAuth } from '../services/firebase';

const DirectRouter = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  });
  return (
    <Switch>
      <Route path="/direct/" component={NewDirectContainer} exact />
      <Route path="/direct/:directId">
        {user ? (
          <MessagesContainer />
        ) : (
          <Redirect to={{ pathname: '/direct' }} />
        )}
      </Route>
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
