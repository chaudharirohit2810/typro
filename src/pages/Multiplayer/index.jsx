import React, { useEffect } from "react";
import io from "socket.io-client";
import Style from "../Dashboard/dashboard.module.scss";
import MultiplayerStyle from "./multiplayer.module.scss";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const socket = io("http://localhost:4000");

const Multiplayer = () => {
  useEffect(() => {});
  return (
    <div className={Style.container}>
      <FontAwesomeIcon icon={faUserFriends} size="5x" />
      <h1 className={Style.title}>Multiplayer mode</h1>
      <p
        className={Style.subtitle}
        style={{
          color: "var(--subtitle-color)",
          fontSize: "18px",
          marginTop: "0",
        }}
      >
        Be competitive! Create a room and share the link to your friends and
        then Battle it out with them and show your typing skills
      </p>
      <button className="main__button">Generate room link</button>
      <div>
        <h2>Your room link</h2>
      </div>
    </div>
  );
};

export default Multiplayer;
