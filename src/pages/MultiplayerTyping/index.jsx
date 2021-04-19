import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import TypingLoader from "../../components/TypingLoader";
import configs from "../../config";
import Style from "../Dashboard/dashboard.module.scss";
import MainTypingTester from "../TypingTest/MainTypingTester";
import Peers from "./Peers";
const socket = io("http://localhost:4000");

const MultiplayerTyping = (props) => {
  const [loading, setloading] = useState(true);

  const his = useHistory();
  useEffect(() => {
    const id = props?.match?.params?.id;
    const codesnippetid = props?.match?.params?.codesnippetid;
    if (!id || !codesnippetid) {
      toast.error("Invalid url!");
      his.replace("/");
    }

    axios
      .get(`${configs.BACKEND_URL}/room/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        socket.emit("peer_added", {
          username: localStorage.getItem("username"),
          room_id: id,
        });
      })
      .catch((err) => {
        toast.error("Invalid room id");
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
      <Peers socket={socket} />

      <MainTypingTester
        ismultiplayer={true}
        socket={socket}
        room_id={props.match.params.id}
        codesnippetid={props?.match?.params?.codesnippetid}
      />
    </div>
  );
};

export default MultiplayerTyping;
