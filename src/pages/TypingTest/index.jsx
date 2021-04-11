import React from "react";
import MainTypingTester from "./MainTypingTester";
import Style from "../Dashboard/dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
// import TypingTester from "./TypingTester";

const TypingTest = () => {
  return (
    <div className={Style.container}>
      <FontAwesomeIcon icon={faTachometerAlt} size="5x" />
      <h1 className={Style.title}>Single Player Typing Test</h1>
      <p className={Style.subtitle} style={{ color: "var(--subtitle-color)" }}>
        Work hard in silence! Type the provided open source code snippet as fast
        as you can.
      </p>
      {/* <h1>You are on typing test page</h1> */}
      <MainTypingTester />
    </div>
  );
};

export default TypingTest;
