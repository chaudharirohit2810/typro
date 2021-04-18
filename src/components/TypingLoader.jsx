import React from "react";
import Style from "../pages/Dashboard/dashboard.module.scss";

const TypingLoader = ({ msg }) => {
  return (
    <div className={Style.loader}>
      <span></span>
      <span></span>
      <span></span>
      <p>{msg}</p>
    </div>
  );
};

export default TypingLoader;
