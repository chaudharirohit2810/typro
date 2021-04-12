import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import Style from "./typingtest.module.scss";
import { useCountDown, usePressedKey } from "./Hooks";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainTypingTester = () => {
  const testTime = 10000;
  const typer = useRef(null);
  const [speed, setspeed] = useState(0);
  const [
    remainingTime,
    countDownStarted,
    startCountDown,
    resetCountDown,
  ] = useCountDown(testTime);
  const [typedIndex, setTypedIndex] = useState(0);
  const [correctIndex, setcorrectIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wrongTypes, setWrongTypes] = useState(0);
  const [pressedKey, _setPressedKey] = usePressedKey();

  // const para =
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis\
  // voluptates ea odio molestiae officiis qui voluptate? Accusamus\
  // architecto voluptatem quia eveniet quis. Unde nisi et assumenda\
  // ducimus laboriosam exercitationem! Ex nihil mollitia ullam eveniet\
  // optio commodi praesentium dolor vel dolorum ipsa unde enim est ipsum\
  // dignissimos vero fugiat tenetur, corrupti earum. Quos fugiat aut\
  // expedita vitae velit porro magni sunt neque possimus ratione!\
  // Similique dolores consequatur necessitatibus explicabo. Molestiae,\
  // facere? Adipisci provident eos ipsa optio velit voluptates aliquid,\
  // molestiae officiis. Consequuntur temporibus excepturi veritatis dolor,\
  // vero enim accusantium illum repellendus nam. Ut ad, unde cupiditate\
  // fuga enim veritatis quis vero?";
  const para =
    "export function push(heap: Heap, node: Node): void {\nconst index = heap.length;\nheap.push(node);\nsiftUp(heap, node, index);\n}";

  const getFormattedContent = (data) => {
    let totalIndex = 0;
    console.log(data);
    const correctString = data.substr(0, correctIndex);
    const wrongString = data.substr(correctIndex, typedIndex - correctIndex);
    const remainingString = data.substr(typedIndex, para.length - typedIndex);
    console.log(correctString, wrongString, remainingString);
    var item = (
      <>
        {correctString.split("\n").map((v, index) => (
          <>
            <span style={{ color: "rgb(0, 253, 177)" }}>{v}</span>
            {index !== correctString.split("\n").length - 1 && <br />}
          </>
        ))}
        {wrongString.split("\n").map((v, index) => (
          <>
            <span style={{ color: "rgb(255, 100, 25)" }}>{v}</span>
            {index !== wrongString.split("\n").length - 1 && <br />}
          </>
        ))}
        {remainingString.split("\n").map((v) => (
          <>
            <span>{v}</span>
            <br />
          </>
        ))}
      </>
    );
    return item;
  };

  useEffect(() => {
    if (countDownStarted) {
      console.log(remainingTime);
      if (pressedKey.length === 0) {
        return;
      }
      const ignoreKeys = [
        "Shift",
        "Alt",
        "Tab",
        "Escape",
        "Control",
        "CapsLock",
        "",
      ];
      if (ignoreKeys.find((v) => v === pressedKey)) {
        return;
      }
      switch (pressedKey) {
        case para[typedIndex]:
          setcorrectIndex(correctIndex + 1);
          setTypedIndex(typedIndex + 1);
          break;
        case "Backspace":
          if (typedIndex > 0) {
            setTypedIndex(typedIndex - 1);
          }
          if (correctIndex >= typedIndex) {
            setcorrectIndex(correctIndex - 1);
          }
          break;
        default:
          setTypedIndex(typedIndex + 1);
          setWrongTypes(wrongTypes + 1);
          break;
      }
      const elapsedTime = testTime - remainingTime || 1;
      const wpm = Math.floor((correctIndex / 5 / elapsedTime) * 60);
      setspeed(wpm);

      const acc = 100 - Math.floor((wrongTypes / typedIndex) * 100);
      setAccuracy(acc);
    }
  }, [pressedKey, countDownStarted]);
  return (
    <div>
      {remainingTime === 0 ? (
        <h1>Typing test Ended. Your Speed is {speed} wpm</h1>
      ) : (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            onClick={() => startCountDown(true)}
            className="main__button"
            style={{ margin: "0px auto 2rem", cursor: "pointer" }}
          >
            <FontAwesomeIcon
              icon={faKeyboard}
              style={{ marginRight: "10px", fontSize: "18px" }}
            />
            Start Test
          </div>
          <Card>
            <p
              style={{ fontSize: 20, lineHeight: 1.7 }}
              onKeyDown={(e) => console.log(e)}
            >
              {getFormattedContent(para)}
              {/* <span style={{ color: "rgb(0, 253, 177)" }}>
                {para.substr(0, correctIndex)}
              </span> */}
              {/* {correctIndex <= typedIndex && (
                <span style={{ color: "rgb(255, 100, 25)" }}>
                  {para.substr(correctIndex, typedIndex - correctIndex)}
                </span>
              )} */}
              {/* <span>{para.substr(typedIndex, para.length - typedIndex)}</span> */}
            </p>
          </Card>
          <Card
            style={{
              borderTop: "2px solid var(--bg-color)",
              display: "flex",
              justifyContext: "space-around",
              padding: 0,
            }}
          >
            <div className={Style.stats}>Speed: {speed} wpm</div>
            <div className={Style.stats}>Accuracy: {accuracy}%</div>
            <div className={Style.stats}>Time remaining: {remainingTime}s</div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MainTypingTester;
