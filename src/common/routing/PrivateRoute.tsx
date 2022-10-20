import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks";

interface PrivateRouteProps {
  path: string;
  children: any;
  exact?: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  path,
  exact,
}) => {
  const { user } = useAuth();
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
