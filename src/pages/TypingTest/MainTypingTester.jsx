import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Style from "./typingtest.module.scss";
import { useCountDown, usePressedKey } from "./Hooks";
import { faKeyboard, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TestEnded from "./TestEnded";

const MainTypingTester = () => {
  const testTime = 60;
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
  const [pressedKey, _] = usePressedKey();
  const [speedData, setSpeedData] = useState([]);

  const para =
    "export function push(heap: Heap, node: Node): void {↵\n\tconst index = heap.length;↵\n\theap.push(node);↵\n\tsiftUp(heap, node, index);↵\n}";

  const getFormattedContent = (data) => {
    const correctString = data.substr(0, correctIndex);
    const wrongString = data.substr(correctIndex, typedIndex - correctIndex);
    const remainingString = data.substr(typedIndex, para.length - typedIndex);
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
    if (countDownStarted && correctIndex < para.length) {
      console.log(speedData);
      // speedData[60 - remainingTime] = speed;
      setSpeedData((prev) => {
        prev.push({ time: `${60 - remainingTime} sec`, speed: speed });
        return prev;
      });
    }
  }, [remainingTime]);

  useEffect(() => {
    if (countDownStarted && correctIndex < para.length) {
      // console.log({ pressedKey, paraKey });
      if (pressedKey.length === 0) {
        return;
      }
      let keyAtTypedIndex = para[typedIndex];
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

      if (pressedKey === "Backspace") {
        if (typedIndex > 0) {
          setTypedIndex(typedIndex - 1);
        }
        if (correctIndex >= typedIndex) {
          setcorrectIndex(correctIndex - 1);
        }
        return;
      }

      if (pressedKey === "Enter") {
        let temp = typedIndex;
        if (keyAtTypedIndex === "↵") {
          setcorrectIndex(correctIndex + 1);
        } else {
          setWrongTypes(wrongTypes + 1);
        }

        let paraKey = String(para[temp + 1]);
        // temp = typedIndex;
        while (paraKey === "\t" || paraKey === "\n") {
          temp += 1;
          paraKey = String(para[temp]);
        }
        setTypedIndex(temp);
        setcorrectIndex(temp);

        return;
      }

      switch (pressedKey) {
        case String(para[typedIndex]):
          setcorrectIndex(correctIndex + 1);
          setTypedIndex(typedIndex + 1);
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
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        minWidth: "50rem",
      }}
    >
      {remainingTime === 0 || correctIndex >= para.length ? (
        <>
          <TestEnded speed={speed} data={speedData} />
        </>
      ) : (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ margin: "0px auto 2rem" }}>
            <div
              onClick={() => startCountDown(true)}
              className="main__button"
              style={{ cursor: "pointer", marginRight: "10px" }}
            >
              <FontAwesomeIcon
                icon={faKeyboard}
                style={{ marginRight: "10px", fontSize: "18px" }}
              />
              Start Test
            </div>
            <div
              onClick={() => {
                resetCountDown();
                setspeed(0);
                setAccuracy(100);
                setTypedIndex(0);
                setcorrectIndex(0);
                setWrongTypes(0);
              }}
              className="main__button"
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faRedoAlt}
                style={{ marginRight: "10px", fontSize: "18px" }}
              />
              Reset Test
            </div>
          </div>
          <Card>
            <p
              style={{ fontSize: 20, lineHeight: 1.7 }}
              onKeyDown={(e) => console.log(e)}
              className={Style.code__snippet}
            >
              <div className={Style.time}>{remainingTime}s</div>
              {/* {getFormattedContent(para)} */}
              <div style={{ paddingTop: "1.5rem" }}>
                <span style={{ color: "rgb(0, 253, 177)" }}>
                  {para.substr(0, correctIndex)}
                </span>
                {correctIndex <= typedIndex && (
                  <span style={{ color: "rgb(255, 100, 25)" }}>
                    {para.substr(correctIndex, typedIndex - correctIndex)}
                  </span>
                )}
                <span style={{ backgroundColor: "#51586c", opacity: 0.7 }}>
                  {para[typedIndex]}
                </span>
                <span>
                  {para.substr(typedIndex + 1, para.length - typedIndex)}
                </span>
              </div>
            </p>
          </Card>
        </div>
      )}
      <div
        style={{
          borderTop: "2px solid var(--bg-color)",
          display: "flex",
          justifyContext: "space-around",
          padding: 0,
        }}
      >
        <Card className={Style.stats}>Speed: {speed} wpm</Card>
        <Card className={Style.stats}>Accuracy: {accuracy}%</Card>
      </div>
    </div>
  );
};

export default MainTypingTester;
