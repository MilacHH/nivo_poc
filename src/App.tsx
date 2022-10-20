import React from "react";
import styled from "@emotion/styled";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { PrivateRoute, UnloggedRoute } from "./common/routing";
import { Login } from "./login";
import { Home } from "./home";

const App = () => (
  <AppWrapper>
    <Router>
      <AppWrapper>
        <Switch>
          <PrivateRoute path="/charts">
            <Home />
          </PrivateRoute>
          <UnloggedRoute path="/login">
            <Login />
          </UnloggedRoute>
          <UnloggedRoute path="/">
            <Redirect to={`/login`} />
          </UnloggedRoute>
        </Switch>
      </AppWrapper>
    </Router>
  </AppWrapper>
);

const AppWrapper = styled.div`
  @media only screen and (min-width: 768px) {
    height: 100vh;
  }
  background-color: #4761ac;
`;

export default App;
