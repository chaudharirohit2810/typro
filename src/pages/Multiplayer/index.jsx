import React, { useEffect, useState } from "react";
import Style from "../Dashboard/dashboard.module.scss";
import MultiplayerStyle from "./multiplayer.module.scss";
import { faCopy, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import axios from "axios";
import configs from "../../config";
import TypingLoader from "../../components/TypingLoader";

const Multiplayer = () => {
  const [loading, setloading] = useState(false);
  const [id, setid] = useState(undefined);
  const generateRoomLink = () => {
    let room_id = nanoid(6);
    setloading(true);
    axios
      .post(`${configs.BACKEND_URL}/room/`, { room_id })
      .then((res) => {
        setid(room_id);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setloading(false);
      });
  };
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
      <button className="main__button" onClick={generateRoomLink}>
        Generate room link
      </button>
      <div className={MultiplayerStyle.link_div}>
        {loading ? (
          <TypingLoader msg={"Generating room id....."} />
        ) : (
          <>
            {id === undefined ? (
              <h2>Click above button to generate room id</h2>
            ) : (
              <>
                <h2>Your room link</h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      display: "block",
                      marginRight: "1rem",
                    }}
                  >
                    http://localhost:3000/multiplayertyping/{id}
                  </span>
                  <FontAwesomeIcon icon={faCopy} style={{ fontSize: "20px" }} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Multiplayer;
