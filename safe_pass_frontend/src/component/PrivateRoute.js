import React from "react";
import { Route, Redirect } from "react-router-dom";

// export const PrivateRoute = ({ ...rest }) => {
//   const auth = JSON.parse(localStorage.getItem("token"));
//   if (auth) {
//     if (auth.token) {
//       return <Route {...rest} />;
//     }
//   }
//   return <Redirect to="/signin" />;
// };

// export const AdminAuthRoute = ({ ...rest }) => {
//   const userRole = localStorage.getItem("userRole");
//   if (userRole) {
//     if (userRole == 1) {
//       return <Route {...rest} />;
//     }
//   }
//   return <Redirect to="/unAuthorized" />;
// };
export const CombinedRoute = ({ component: Component, ...rest }) => {
  const auth = JSON.parse(localStorage.getItem("token"));
  const userRole = localStorage.getItem("userRole");

  // if (auth && auth.token && userRole && userRole === "1") {
  if (auth && auth.token && userRole) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else if (auth && auth.token) {
    return <Redirect to="/unAuthorized" />;
  } else {
    return <Redirect to="/signin" />;
  }
};
