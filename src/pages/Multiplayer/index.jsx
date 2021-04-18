import React, { useEffect } from "react";
import Style from "../Dashboard/dashboard.module.scss";
import MultiplayerStyle from "./multiplayer.module.scss";
import { faCopy, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";

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
      <div className={MultiplayerStyle.link_div}>
        <h2>Your room link</h2>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-around",
            // width: "90%",
            alignItems: "center",
          }}
        >
          {/* <div style={{ marginRight: "1rem" }}> */}
          <span
            style={{ fontSize: "18px", display: "block", marginRight: "1rem" }}
          >
            http://localhost:3000/multiplayertyping/{nanoid(6)}
          </span>
          {/* </div> */}
          <FontAwesomeIcon icon={faCopy} style={{ fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default Multiplayer;
