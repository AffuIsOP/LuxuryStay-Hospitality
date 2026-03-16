import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const { jwtDecode } = require("jwt-decode");

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  const location = useLocation();
  const currentPath = location.pathname;

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);
  const { userrole, staffRoles, status: userStatus } = decodedToken;

  if (currentPath === "/dashboard/") {
    if (userrole === "guest") {
      return <Navigate to="/" />;
    }

    if (userrole === "admin") {
      return React.cloneElement(children, { userrole });
    }

    if (userrole === "staff") {
      if (userStatus === "pending") {
        return <Navigate to="/login" />;
      } else if (userStatus === "active") {
        return React.cloneElement(children, { userrole, staffRoles });
      } else {
        console.error("Invalid status detected. Redirecting to login...");
        return <Navigate to="/login" />;
      }
    }

    console.log("Unauthorized user role, redirecting to login...");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
