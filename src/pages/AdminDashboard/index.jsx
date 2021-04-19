import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TypingLoader from "../../components/TypingLoader";
import Snippets from "./Snippets";
import Style from "../Dashboard/dashboard.module.scss";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const his = useHistory();
  useEffect(() => {}, []);

  if (loading) {
    return <TypingLoader msg={"Authenticating your account..."} />;
  }

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
