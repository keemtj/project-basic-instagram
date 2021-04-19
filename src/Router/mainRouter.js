import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import DirectPage from '../Pages/DirectPage';
import ProfilePage from '../Pages/ProfilePage';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import LoadingPage from '../Pages/LoadingPage';

const MainRouter = ({ isSignIn }) => {
  return (
    <Switch>
      {isSignIn && <Route path="/" component={MainPage} exact />}
      {isSignIn && <Route path="/direct" component={DirectPage} />}
      {isSignIn && <Route path="/profile" component={ProfilePage} />}
      {!isSignIn && <Route path="/login" component={LoginPage} />}
      <Route path="/signup" component={SignupPage} />
      <Route
        render={() => {
          return <LoadingPage />;
        }}
      />
    </Switch>
  );
};

export default MainRouter;
