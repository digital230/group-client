import React, { Component } from 'react';
import { SocketProvider, socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
import { Switch, Route, withRouter } from 'react-router-dom';
import Routes from './Routes';
import Login from './pages/Login';
import Register from './pages/Register.js';
import helpers from './utils/Helper';

const routes = [...Routes];
let socket = helpers.getSocket();

const App = () => {
  return (
    <SocketProvider socket={socket}>
      <Switch>
        <Route
          path="/login"
          exact
          component={Login}
        />

        <Route
          path="/register"
          exact
          component={Register}
        />


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
    </SocketProvider>
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
