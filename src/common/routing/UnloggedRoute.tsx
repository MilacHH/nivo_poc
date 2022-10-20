import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks";

interface UnloggedRouteProps {
  path: string;
  children: any;
}

export const UnloggedRoute: React.FC<UnloggedRouteProps> = ({
  children,
  path,
}) => {
  const { user } = useAuth();
  return (
    <Route
      path={path}
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/charts`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
