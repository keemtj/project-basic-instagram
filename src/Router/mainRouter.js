import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import DirectPage from '../Pages/DirectPage';
import ProfilePage from '../Pages/ProfilePage';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import NotFound from '../Component/Global/NotFound';
import LoadingPage from '../Pages/LoadingPage';
import EditPage from '../Pages/EditPage';
import NewPost from '../Component/New/NewPost';

const MainRouter = ({ isSignIn }) => {
  const mainRoutes = [
    {
      path: '/',
      exact: true,
      children: <MainPage />,
    },
    {
      path: '/direct',
      exact: false,
      children: <DirectPage />,
    },
    {
      path: '/edit',
      exact: false,
      children: <EditPage />,
    },
    {
      path: '/p/:displayName',
      exact: false,
      children: <ProfilePage />,
    },
  ];
  return (
    <Switch>
      {mainRoutes.map(({ path, exact, children }, index) => (
        <Route key={index} path={path} exact={exact}>
          {isSignIn ? children : <LoadingPage />}
        </Route>
      ))}
      {isSignIn && (
        <Route path="/new">
          <NewPost />
        </Route>
      )}
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
