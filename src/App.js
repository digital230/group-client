import React, { Component } from 'react';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import { Switch, Route, withRouter } from 'react-router-dom';

import Routes from './group/Routes';

const routes = [...Routes];


const App = () => {
  return (
    <Switch>
      {routes.map((r, i) => {
        return (
          <Route
            key={i}
            path={r.path}
            exact={r.exact}
            render={() => <AppRoute Component={r.component} Layout={r.layout} />}
          />
        );
      })}
    </Switch>
  );
}

const AppRoute = ({ Component, Layout }) => {
  if (Layout) {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  } else if (!Component){
    return <Layout />;
  } else {
    return <Component />;
  }
};

export default withRouter(App);
