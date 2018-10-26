import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Label, Sticky, Segment, Header } from 'semantic-ui-react'
import routeConfig from "../../api/config";
import axios from "axios";

import Dashboard from './dashboard'
import Data from './data'

const routes = [
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/data",
    component: Data,
  }
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props}/>
    )}
  />
);

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu size='large' className="appMenu">
            <Menu.Item header className="headr">LENDS Admin</Menu.Item>
            <Link className="item" to="/dashboard">Dashboard</Link>
            <Link className="item" to="/data">Data</Link>
          </Menu>
          <div>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}            
          </div>
        </div>
      </Router>
    );
  }
}



export default Main;
