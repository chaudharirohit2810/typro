import React from "react";
import Style from "../pages/Dashboard/dashboard.module.scss";

const TypingLoader = ({ msg }) => {
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
      <div className={Style.loader}>
        <span></span>
        <span></span>
        <span></span>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default TypingLoader;
