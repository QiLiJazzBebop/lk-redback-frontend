import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Activity from "./Activity";
// import DrawerRouterContainer from "./layout/DrawerRouterContainer";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login.js";
import Register from "./Register.js";
import "./styles/_App.scss";

export default function App() {
  return (
    <BrowserRouter>
      {/* <DrawerRouterContainer> */}
        <div className="page-container">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/activity/:activityId(\d+)">
              <Activity />
            </Route>
          </Switch>
        </div>
      {/* </DrawerRouterContainer> */}
    </BrowserRouter>
  );
}
