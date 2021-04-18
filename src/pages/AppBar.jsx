import React from "react";
import { useHistory } from "react-router-dom";

const AppBar = () => {
  const his = useHistory();
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
      <h2 style={{ margin: "0px" }}>typro</h2>
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
          his.replace("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AppBar;
