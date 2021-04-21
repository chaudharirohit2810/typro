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

// const socket = io("http://localhost:4000");

const MultiplayerTyping = (props) => {
  const [socket, setSocket] = useState(undefined);
  const [loading, setloading] = useState(true);
  const [peers, setPeers] = useState([]);

  const his = useHistory();
  useEffect(() => {
    // const temp = io("http://localhost:4000");
    // const temp = io("http://typro.rohitchaudhari.me/api");
    const temp = io("https://typro-backend.herokuapp.com/");
    setSocket(temp);
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
        temp.emit("peer_added", {
          username: localStorage.getItem("username"),
          room_id: id,
        });
        setPeers(res.data.users);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Invalid room id");
        his.replace("/");
      })
      .finally(() => {
        setloading(false);
      });
    return () => {
      if (socket) {
        socket.emit("peer_left", {
          username: localStorage.getItem("username"),
          room_id: id,
        });
      }
    };
  }, []);

  if (loading || !socket) {
    return (
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
      </div>
    );
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
