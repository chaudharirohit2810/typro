import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Style from "../Dashboard/dashboard.module.scss";
import Snippets from "./Snippets";
const Dashboard = () => {
  return (
    <div className={Style.container}>
      <FontAwesomeIcon icon={faKeyboard} size="5x" />

      <h1 className={Style.title}>Admin Panel</h1>
      <div
        style={{
          marginTop: "1rem",
          marginRight: "1.25rem",
          alignSelf: "flex-end",
        }}
      >
        <Link className="main__button" to="/addSnippet">
          Add new Code Snippet
        </Link>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Snippets />
      </div>
    </div>
  );
};

export default Dashboard;
