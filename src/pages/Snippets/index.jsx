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
  faCross,
  faMagic,
  faEraser,
  faLanguage,
  faMarker,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import config from "../../config";
import TypingLoader from "../../components/TypingLoader";

const Dashboard = () => {
  // const [loading, setLoading] = useState(true);
  // const his = useHistory();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get(`${config.BACKEND_URL}/user/verify`, {
  //       headers: {
  //         token,
  //       },
  //     })
  //     .then((res) => {
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err.message);
  //       his.replace("/login");
  //     });
  // }, []);

  // if (loading) {
  //   return <TypingLoader msg={"Authenticating your account..."} />;
  // }
  let fetchAllSnippets = () => {
    let x = [];
    for (let i = 0; i < 4; i++) {
      x.push(<DashBoardCard
        title={
          <span>
            <FontAwesomeIcon
              icon={faMarker}
              style={{ marginRight: 10 }}
            />
            C++
          </span>
        }
        desc={`Work hard in silence! Type the provided open source code snippet as fast as you can to improve your typing speed and programming skills. The code snippet is provided in your favorite programming language.`}
        link="/typingtest"
        linkTitle="Delete Snippet"
        icon={faEraser}
      />);
    }
    return x;
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
      
      {fetchAllSnippets()};
    </div>
  );
};

export default Dashboard;
