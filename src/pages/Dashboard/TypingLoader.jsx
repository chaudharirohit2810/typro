import React from "react";
import Style from "./dashboard.module.scss";

const typingLoader = () => {
  return (
    <div className={Style.loader}>
      <span></span>
      <span></span>
      <span></span>
      <p>Authenticating your account...</p>
    </div>
  );
};

export default typingLoader;
