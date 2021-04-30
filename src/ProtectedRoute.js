import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import configs from "./config";
import TypingLoader from "./components/TypingLoader";
import Style from "./pages/Dashboard/dashboard.module.scss";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [validated, setValidated] = useState(null);

  const verifyToken = async () => {
    var token = localStorage.getItem("token");
    if (!token) {
      setValidated(false);
      return;
    }
    await axios
      .get(configs.BACKEND_URL + "/user/verify", {
        headers: { token: token },
      })
      .then((response) => {
        setValidated(true);
      })
      .catch((err) => {
        setValidated(false);
        console.log(err);
      });
  };

  useEffect(() => {
    verifyToken();
  }, []);
  if (validated != null && validated) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  } else if (validated != null && !validated) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div
        className={Style.container}
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TypingLoader msg={"Authenticating your account..."} />
      </div>
    );
  }
};
export default ProtectedRoute;
