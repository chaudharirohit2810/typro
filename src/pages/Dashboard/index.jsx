import {
  faArrowRight,
  faChartLine,
  faKeyboard,
  faTachometerAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Style from "./dashboard.module.scss";
import DashBoardCard from "./DashboardCard";

const Dashboard = () => {
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
        desc={`Work hard in silence! Type the provided open source code snippet as fast as you can to improve your typing speed and programming skills. The code snippet is provided in your favorite programming language.`}
        link="/typingtest"
        linkTitle="Start typing test"
        icon={faArrowRight}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
            "Be competitive! Create a room and share the link to your friends and then Battle it out with them and show your typing skills"
          }
          link="/multiplayer"
          linkTitle="Create room"
          icon={faArrowRight}
        />
        <DashBoardCard
          title={
            <span>
              <FontAwesomeIcon icon={faChartLine} style={{ marginRight: 10 }} />
              Check your progress
            </span>
          }
          desc={
            "Monitor your progress over the period to check how you have improved your typing speed and compare your stats with others"
          }
          link="/stats"
          linkTitle="Checkout stats"
          icon={faArrowRight}
        />
      </div>
    </div>
  );
};

export default Dashboard;
