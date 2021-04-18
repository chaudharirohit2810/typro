import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Style from "./dashboard.module.scss";
import DashBoardCard from "./DashboardCard";
import {
  faArrowRight,
  faKeyboard,
  faUserFriends,
  faChartLine,
  faTachometerAlt,
  faAddressBook,
  faUpload,
  faMarker,
  faEraser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import config from "../../config";
import TypingLoader from "../../components/TypingLoader";
import {Snippets} from "../../pages";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const his = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${config.BACKEND_URL}/user/verify`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        his.replace("/adminlogin");
      });
  }, []);

  if (loading) {
    return <TypingLoader msg={"Authenticating your account..."} />;
  }
  
  return (
    <div className={Style.container}>
      <FontAwesomeIcon icon={faKeyboard} size="5x" />
      
      <h1 className={Style.title}>TyPro: Typing master for programmers</h1>
      <p
        className={Style.subtitle}
        style={{ color: "var(--subtitle-color)", fontSize: "18px" }}
      >
        A unique way to improve typing skills along with programming skills.
        This is done by replacing general english paragraphs used in existing
        typing tutors with open source coding snippets
      </p>
      <div style = {{position: "absolute", right: "-0%", top: "-7%"}}>
      <DashBoardCard
        link="/addSnippet"
        linkTitle="Add a code snippet"
        icon={faArrowRight}
      />
      </div>
      
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        
      <Snippets/>
      </div>
    </div>
  );
};

export default Dashboard;
