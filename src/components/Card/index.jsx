import React from "react";
import Style from "./card.module.scss";

const Card = (props) => {
  return (
    <div
      className={`${Style.card} ${props.className}`}
      style={props.style ?? {}}
    >
      {props.children}
    </div>
  );
};

export default Card;
