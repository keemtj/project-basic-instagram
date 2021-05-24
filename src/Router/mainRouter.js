import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import DirectPage from '../Pages/DirectPage';
import ProfilePage from '../Pages/ProfilePage';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import EditPage from '../Pages/EditPage';
import NewPost from '../Component/New/NewPost';
// import LoadingPage from '../Pages/LoadingPage';
// import NotFound from '../Component/Global/NotFound';

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
      path: '/:displayName',
      exact: false,
      children: <ProfilePage />,
    },
  ];
  return (
    <Switch>
      {isSignIn &&
        mainRoutes.map(({ path, exact, children }, index) => (
          <Route key={index} path={path} exact={exact}>
            {children}
          </Route>
        ))}
      {isSignIn && (
        <Route path="/new">
          <NewPost />
        </Route>
      )}
      {!isSignIn && (
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
      )}
      {!isSignIn && (
        <Route path="/login" exact>
          <LoginPage />
        </Route>
      )}
      {/* <Route>
        <LoadingPage />
      </Route> */}
    </Switch>
  );
};

export default MainRouter;
