import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Channel from '../Component/Channel';
import MyImages from '../Component/MyImages';
import Saved from '../Component/Saved';
import Tagged from '../Component/Tagged';

const InfoRouter = () => {
  return (
    <Switch>
      <Route path="/user/" component={MyImages} exact />
      <Route path="/user/channel/" component={Channel} />
      <Route path="/user/saved/" component={Saved} />
      <Route path="/user/tagged/" component={Tagged} />
      <Route
        render={({ location }) => (
          <div>
            <span>이 페이지는 존재하지 않습니다:</span>
            <span>{` ${location.pathname}`}</span>
          </div>
        )}
      />
    </Switch>
  );
};

export default InfoRouter;
