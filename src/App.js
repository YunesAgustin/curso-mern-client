import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';
import './App.scss';

function App() {
  return (
    // Envuevlo todo con el authProvider, va a controlar toda la hora si la sesion es valida
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />} // render sirve para poder mostrar mas de un component
    />
  );
}

export default App;
