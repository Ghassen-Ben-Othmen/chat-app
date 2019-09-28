import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Navbar from "./Navbar";
import { checkForAuthentication } from "../data/actions";

import { Context } from "../data/AppContext";

const AppContent = () => {
  const {
    userState,
    userDispatch,
    currentChatRoomDispatch,
    dataDispatch
  } = React.useContext(Context);
  const { authenticated } = userState;

  checkForAuthentication(
    authenticated,
    userDispatch,
    currentChatRoomDispatch,
    dataDispatch
  );

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={props =>
            authenticated ? <Home {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/signin"
          render={props =>
            !authenticated ? <Signin {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/signup"
          render={props =>
            !authenticated ? <Signup {...props} /> : <Redirect to="/" />
          }
        />
      </Switch>
    </Router>
  );
};

export default AppContent;
