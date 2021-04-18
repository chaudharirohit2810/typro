import React, { useEffect } from "react";
import io from "socket.io-client";
import MainTypingTester from "../TypingTest/MainTypingTester";
import Style from "../Dashboard/dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
const socket = io("http://localhost:4000");

const MultiplayerTyping = (props) => {
  console.log(props.match.params.id);
  useEffect(() => {
    const id = props?.match?.params?.id;
    if (!id) {
      console.log("Invalid id");
    }
    socket.on("get_peer_typing_scores", (data) => {
      console.log(data);
    });
  });
  return (
    <div className={Style.container}>
      <FontAwesomeIcon icon={faTachometerAlt} size="5x" />
      <h1 className={Style.title}>Multiplayer mode</h1>
      <p className={Style.subtitle} style={{ color: "var(--subtitle-color)" }}>
        Work hard in silence! Type the provided open source code snippet as fast
        as you can.
      </p>
      {/* <h1>You are on typing test page</h1> */}
      <MainTypingTester ismultiplayer={true} socket={socket} />
    </div>
  );
};

export default MultiplayerTyping;
