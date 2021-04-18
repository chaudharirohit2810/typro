import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import MainTypingTester from "../TypingTest/MainTypingTester";
import Style from "../Dashboard/dashboard.module.scss";
import TypingLoader from "../../components/TypingLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import configs from "../../config";
import Card from "../../components/Card";
import Peers from "./Peers";
const socket = io("http://localhost:4000");

const MultiplayerTyping = (props) => {
  const [loading, setloading] = useState(true);
  const [peers, setPeers] = useState([]);

  const his = useHistory();
  useEffect(() => {
    const id = props?.match?.params?.id;
    axios
      .get(`${configs.BACKEND_URL}/room/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPeers(res.data);
        socket.emit("peer_added", {
          username: localStorage.getItem("username"),
        });
      })
      .catch((err) => {
        his.replace("/");
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  if (loading) {
    <div
      className={Style.container}
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TypingLoader msg={"Validating room id..."} />
    </div>;
  }
  return (
    <div className={Style.container}>
      <FontAwesomeIcon icon={faTachometerAlt} size="5x" />
      <h1 className={Style.title}>Multiplayer mode</h1>
      <p className={Style.subtitle} style={{ color: "var(--subtitle-color)" }}>
        Work hard in silence! Type the provided open source code snippet as fast
        as you can.
      </p>
      <Peers socket={socket} defaultPeers={peers} />
      <MainTypingTester ismultiplayer={true} socket={socket} />
    </div>
  );
};

export default MultiplayerTyping;
