import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import DirectPage from '../Pages/DirectPage';
import ProfilePage from '../Pages/ProfilePage';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import NotFound from '../Component/Global/NotFound';
import LoadingPage from '../Pages/LoadingPage';

const MainRouter = ({ isSignIn }) => {
  return (
    <Switch>
      <Route path="/" exact>
        {isSignIn ? <MainPage /> : <LoadingPage />}
      </Route>
      <Route path="/direct">
        {isSignIn ? <DirectPage /> : <LoadingPage />}
      </Route>
      <Route path="/p/:displayName">
        {isSignIn ? <ProfilePage /> : <LoadingPage />}
      </Route>
      {!isSignIn && (
        <Route path="/signup">
          <SignupPage />
        </Route>
      )}
      {!isSignIn && (
        <Route path="/login">
          <LoginPage />
        </Route>
      )}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default MainRouter;
