import React, { useEffect, useState } from "react";
import Style from "../Dashboard/dashboard.module.scss";
import MultiplayerStyle from "./multiplayer.module.scss";
import { faCopy, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import axios from "axios";
import configs from "../../config";
import TypingLoader from "../../components/TypingLoader";
import { Form } from "react-bootstrap";

const Multiplayer = () => {
  const frontend = "http://localhost:3000";
  const [loading, setloading] = useState(false);
  const [id, setid] = useState(undefined);
  const [codeSnippetId, setcodeSnippetId] = useState();
  const [language, setLanguage] = useState("C");
  const generateRoomLink = () => {
    let room_id = nanoid(6);
    setloading(true);
    axios
      .post(`${configs.BACKEND_URL}/room/`, { room_id, language })
      .then((res) => {
        // console.log(res.data);
        setid(room_id);
        setcodeSnippetId(res.data);
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
      <Form.Group
        controlId="name"
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
          Select preferred language:{""}
        </Form.Label>
        <br></br>
        <Form.Control
          autoFocus
          type="name"
          as="select"
          style={{ width: "90%" }}
          className="main__input"
          placeholder="Enter Name"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option style={{ color: "blue" }}>C</option>
          <option style={{ color: "blue" }}>C++</option>
          <option style={{ color: "blue" }}>Java</option>
          <option style={{ color: "blue" }}>Python</option>
          <option style={{ color: "blue" }}>Javascript</option>
        </Form.Control>
      </Form.Group>
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
                    {frontend}/multiplayertyping/{id}/{codeSnippetId}
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
