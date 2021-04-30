import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Style from "./typingtest.module.scss";
import { useCountDown, usePressedKey } from "./Hooks";
import { faKeyboard, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TestEnded from "./TestEnded";
import axios from "axios";
import configs from "../../config";
import DashboardStyle from "../Dashboard/dashboard.module.scss";
import TypingLoader from "../../components/TypingLoader";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const MainTypingTester = ({
  ismultiplayer,
  socket,
  room_id,
  codesnippetid,
  guest,
  guestLanguage,
}) => {
  const [testTime, setTestTime] = useState(120);
  const [speed, setspeed] = useState(0);
  const [loading, setloading] = useState(true);
  const [para, setPara] = useState("");
  const [
    remainingTime,
    countDownStarted,
    startCountDown,
    resetCountDown,
    setRemainingTime,
  ] = useCountDown(testTime);
  const [typedIndex, setTypedIndex] = useState(0);
  const [correctIndex, setcorrectIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wrongTypes, setWrongTypes] = useState(0);
  const [pressedKey, _] = usePressedKey();
  const [speedData, setSpeedData] = useState([]);
  const [reload, setreload] = useState(0);
  const his = useHistory();

  // const para =
  // "export function push(heap: Heap, node: Node): void {↵\n\tconst index = heap.length;↵\n\theap.push(node);↵\n\tsiftUp(heap, node, index);↵\n}";

  useEffect(() => {
    setloading(true);
    if (ismultiplayer) {
      if (!codesnippetid) {
        his.replace("/");
      }
      axios
        .get(`${configs.BACKEND_URL}/snippets/${codesnippetid}`)
        .then((res) => {
          setPara(res.data.code);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Something went wrong while fetching the snippet");
          his.replace("/");
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      let lang = undefined;
      lang = localStorage.getItem("lang");
      if (!lang) {
        his.replace("/");
      }
      axios
        .get(`${configs.BACKEND_URL}/snippets/language/${lang}`)
        .then((res) => {
          setPara(res.data.code);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Something went wrong while fetchig the snippet");
          his.replace("/");
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [reload]);

  useEffect(() => {
    if (countDownStarted && correctIndex < para.length) {
      setSpeedData((prev) => {
        prev.push({ time: `${testTime - remainingTime} sec`, speed: speed });
        return prev;
      });
      const elapsedTime = testTime - remainingTime || 1;
      const wpm = Math.floor((correctIndex / 5 / elapsedTime) * 60);
      setspeed(wpm);
      if (room_id) {
        const data = {
          speed: wpm,
          username: localStorage.getItem("username"),
          room_id: room_id,
        };
        socket.emit("send_typing_score", data);
      }
    }
  }, [remainingTime]);

  useEffect(() => {
    if (countDownStarted && correctIndex < para.length) {
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

      const acc = 100 - Math.floor((wrongTypes / typedIndex) * 100);
      setAccuracy(acc);
    }
  }, [pressedKey, countDownStarted]);
  if (loading) {
    return (
      <div
        className={DashboardStyle.container}
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TypingLoader msg={"Authenticating your account..."} />
      </div>
    );
  }

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        minWidth: "50rem",
        marginBottom: "2rem",
      }}
    >
      {remainingTime === 0 || correctIndex >= para.length ? (
        <>
          <TestEnded
            speed={speed}
            data={speedData}
            retryTest={() => {
              resetCountDown();
              setspeed(0);
              setAccuracy(100);
              setTypedIndex(0);
              setcorrectIndex(0);
              setWrongTypes(0);
              const temp = reload + 1;
              setreload(temp);
            }}
            ismultiplayer={ismultiplayer}
            postData={{ speed, accuracy }}
            guest={guest}
          />
        </>
      ) : (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!countDownStarted && !ismultiplayer && (
            <div>
              <Form.Group
                size="lg"
                controlId="password"
                style={{ marginTop: "1rem" }}
              >
                <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
                  Test time:{" "}
                </Form.Label>
                <br></br>
                <Form.Control
                  type="number"
                  style={{ width: "100%", marginBottom: "1rem" }}
                  value={testTime}
                  className="main__input"
                  min={60}
                  max={240}
                  placeholder="Enter test time"
                  onChange={(e) => {
                    setRemainingTime(e.target.value);
                    setTestTime(parseInt(e.target.value));
                  }}
                />
              </Form.Group>
            </div>
          )}
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
            {!ismultiplayer && (
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
            )}
          </div>
          <Card>
            <div
              style={{ fontSize: 20, lineHeight: 1.7 }}
              className={Style.code__snippet}
            >
              <div className={Style.time}>{remainingTime}s</div>
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
            </div>
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
      {remainingTime === 0 ||
        (correctIndex >= para.length && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Link to="/" style={{ color: "white", marginBottom: "1rem" }}>
              Go to homepage
            </Link>
          </div>
        ))}
    </div>
  );
};

export default MainTypingTester;
