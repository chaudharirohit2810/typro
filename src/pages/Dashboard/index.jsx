import React from "react";
import Style from "./dashboard.module.scss";
import DashBoardCard from "./DashboardCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const desc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, quo utillo alias laudantium unde eos velit mollitia repudiandae sequi.";
  return (
    <div className={Style.container}>
      <h1 className={Style.title}>TyPro: Typing master for programmers</h1>
      <p className={Style.subtitle} style={{ color: "var(--subtitle-color)" }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
        ducimus error odio voluptatem reprehenderit fuga modi similique?
        Deleniti, eum placeat?
      </p>
      <DashBoardCard
        title={"Typing Test"}
        desc={desc}
        link="/"
        linkTitle="Start typing test"
        icon={faArrowRight}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <DashBoardCard
          title={"Challenge your friends"}
          desc={desc}
          link="/"
          linkTitle="Create room"
          icon={faArrowRight}
        />
        <DashBoardCard
          title={"Check your progress"}
          desc={desc}
          link="/"
          linkTitle="Checkout stats"
          icon={faArrowRight}
        />
      </div>
    </div>
  );
};

export default Dashboard;
