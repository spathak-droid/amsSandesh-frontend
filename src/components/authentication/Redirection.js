import { Route, Redirect } from "react-router-dom";
import { authenticateUser } from "../backend";

export { Redirection };

function Redirection({ component: Component, ...rest }) {
  const auth = authenticateUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}
