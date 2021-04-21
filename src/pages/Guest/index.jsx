import React, { useState } from "react";
import MainTypingTester from "../TypingTest/MainTypingTester";
import Style from "../Dashboard/dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
// import TypingTester from "./TypingTester";

const TypingTest = () => {
  const [language, setLanguage] = useState("C");
  const [startlanguage, setStartLanguage] = useState(false);
  return (
    <div className={Style.container}>
      <FontAwesomeIcon icon={faTachometerAlt} size="5x" />
      <h1 className={Style.title}>Single Player Typing Test</h1>
      <p className={Style.subtitle} style={{ color: "var(--subtitle-color)" }}>
        Work hard in silence! Type the provided open source code snippet as fast
        as you can.
      </p>

      {startlanguage ? (
        <MainTypingTester guest={true} guestLanguage={language} />
      ) : (
        <>
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
          <button
            className="main__button"
            onClick={() => {
              localStorage.setItem("lang", language);
              setStartLanguage(true);
            }}
          >
            Get typing test
          </button>
        </>
      )}
    </div>
  );
};

export default TypingTest;
