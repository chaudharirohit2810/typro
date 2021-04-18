import React from "react";
import Style from "./dashboard.module.scss";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TypingTestCard = (props) => {
  return (
    <Card className={Style.dashboard_card}>
      <h1 style={{ margin: 0, paddingLeft: 0 }}>{props.title}</h1>
      <p
        style={{
          fontSize: "20px",
          lineHeight: 1.6,
          color: "var(--subtitle-color)",
        }}
      >
        {props.desc}
      </p>
      <Link to={props.link} className="main__button">
        {props.linkTitle}
        <FontAwesomeIcon
          icon={props.icon}
          style={{
            marginLeft: "10px",
            color: "var(--button-text-color)",
            fontSize: "20px",
          }}
        />
      </Link>
    </Card>
  );
};

export default TypingTestCard;
