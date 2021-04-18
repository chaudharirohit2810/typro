import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Style from "./dashboard.module.scss";
import DashBoardCard from "./DashboardCard";
import configs from "../../config";
import DashboardStyle from "../Dashboard/dashboard.module.scss";
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
  const [loading, setloading] = useState(true);

  let fetchAllSnippets = () => {
    let x = [];    
    axios
      .get(`${configs.BACKEND_URL}/snippets/`)
      .then((res) => {
        console.log(res.data);
        
        let snippets = res.data.snippets;
        
        for(let i = 0; i < snippets.length; i++) {
          x.push(<DashBoardCard
            title={
              <span>
                <FontAwesomeIcon
                  icon={faMarker}
                  style={{ marginRight: 10 }}
                />
                {snippets[i].language}
              </span>
            }
            desc={snippets[i].code}
            link="/typingtest"
            linkTitle="Delete Snippet"
            icon={faEraser}
          />);
        }
        
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("finish");
        setloading(false);
      });
    
    
    
    return x;
  }
  if (loading) {
    return (
      <div
        className={DashboardStyle.container}
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TypingLoader msg={"Authenticating your account..."} />
      </div>
    );
  }
  return (
    <div className={Style.container}>
      {fetchAllSnippets()}
    </div>
  );
};

export default Dashboard;
