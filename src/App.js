import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";

import { createStore } from "redux";

import { Typography, Divider, Container } from "@material-ui/core";

import ChatPage from "./pages/Chat";
import LoginPage from "./pages/Login";


export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/chat">
            <ChatPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
    </Router>
  );
}
