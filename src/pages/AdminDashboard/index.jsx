import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Style from "./dashboard.module.scss";
import { Link } from "react-router-dom";
import {
  faArrowRight,
  faKeyboard,
  faUserFriends,
  faChartLine,
  faTachometerAlt,
  faAddressBook,
  faUpload,
  faMarker,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import config from "../../config";
import TypingLoader from "../../components/TypingLoader";
import { Snippets } from "../../pages";
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
      {/* <p
        className={Style.subtitle}
        style={{ color: "var(--subtitle-color)", fontSize: "18px" }}
      >
        A unique way to improve typing skills along with programming skills.
        This is done by replacing general english paragraphs used in existing
        typing tutors with open source coding snippets
      </p> */}
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
