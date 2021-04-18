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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import config from "../../config";
import TypingLoader from "../../components/TypingLoader";

const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const his = useHistory();
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get(`${config.BACKEND_URL}/user/verify`, {
//         headers: {
//           token,
//         },
//       })
//       .then((res) => {
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err.message);
//         his.replace("/login");
//       });
//   }, []);

  // if (loading) {
  //   return <TypingLoader msg={"Authenticating your account..."} />;
  // }
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
      
      <div style={{ display: "flex", flexWrap: "wrap" }}>
      <DashBoardCard
        title={
          <span>
            <FontAwesomeIcon
              icon={faTachometerAlt}
              style={{ marginRight: 10 }}
            />
            Typing Test
          </span>
        }
        desc={`Add the open source code snippets Below.`}
        link="/addSnippet"
        linkTitle="Add a code snippet"
        icon={faArrowRight}
      />
        <DashBoardCard
          title={
            <span>
              <FontAwesomeIcon
                icon={faUserFriends}
                style={{ marginRight: 10 }}
              />
              Challenge your friends
            </span>
          }
          desc={
            "Check the existing code snippets below"
          }
          link="/"
          linkTitle="Show Existing"
          icon={faArrowRight}
        />
        
      </div>
    </div>
  );
};

export default Dashboard;
