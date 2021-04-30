import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AppBar = () => {
  const his = useHistory();
  const logoutinvisibleRoutes = ["/login", "/admin", "/register", "/guest"];
  const adminRoutes = ["/admindashboard", "/addSnippet"];
  const [isLogoutVisible, setLogoutVisible] = useState(() => {
    return !logoutinvisibleRoutes.find(
      (item) => item === his.location.pathname
    );
  });

  his.listen((loc) => {
    if (localStorage.getItem("token") || localStorage.getItem("admintoken")) {
      setLogoutVisible(true);
    }
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "var(--card-color)",
        borderBottom: "2px solid var(--card-color)",
        padding: "0.5rem 2rem",
      }}
    >
      <Link to="/">
        <h2 style={{ margin: "0px", textDecoration: "none", color: "#fff" }}>
          typro
        </h2>
      </Link>
      {isLogoutVisible && (
        <button
          style={{
            backgroundColor: "transparent",
            color: "var(--text-color)",
            border: "none",
            outline: "none",
            fontWeight: "700",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.clear();

            if (adminRoutes.find((item) => item === his.location.pathname)) {
              his.replace("/admin");
            } else {
              his.replace("/login");
            }
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default AppBar;
