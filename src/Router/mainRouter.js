import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import DirectPage from '../Pages/DirectPage';
import ProfilePage from '../Pages/ProfilePage';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import LoadingPage from '../Pages/LoadingPage';

const MainRouter = ({ isSignin }) => {
  if (isSignin)
    return (
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/direct" component={DirectPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route
          render={({ history }) => {
            // alert(
            //   '이미 로그인되어 있거나, 잘못된 페이지 입니다. 이전 페이지로 돌아갑니다.',
            // );
            history.goBack();
          }}
        />
      </Switch>
    );
  if (!isSignin)
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
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
