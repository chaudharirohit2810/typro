import axios from "axios";
import React, { useEffect } from "react";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import Card from "../../components/Card";
import configs from "../../config";
import { Link } from "react-router-dom";

const TestEnded = ({
  speed,
  data,
  postData,
  guest,
  retryTest,
  ismultiplayer,
}) => {
  const customTooltipOnYourLine = (e) => {
    if (e.active && e.payload != null && e.payload[0] != null) {
      return (
        <div
          className="custom-tooltip"
          style={{ backgroundColor: "var(--bg-color)", padding: "0px 5px" }}
        >
          <p>{e.payload[0].payload["speed"]} WPM</p>
        </div>
      );
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (!guest) {
      const token = localStorage.getItem("token");
      axios
        .post(`${configs.BACKEND_URL}/stats/`, postData, {
          headers: { token },
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Typing test Ended
      </h1>
      {ismultiplayer ? (
        <Link
          to="/multiplayer"
          style={{ color: "white", marginBottom: "1rem" }}
        >
          Generate new link
        </Link>
      ) : (
        <button
          className="main__button"
          style={{ marginBottom: "1rem" }}
          onClick={retryTest}
        >
          Retry Test
        </button>
      )}

      <Card>
        <h1 style={{ textAlign: "center", margin: "0" }}>WPM per second</h1>
        <LineChart
          width={800}
          height={300}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis dataKey="time"></XAxis>
          <YAxis domain={[0, 200]}></YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-color)",
              border: "none",
              padding: 0,
            }}
            content={customTooltipOnYourLine}
          />
          <Line
            type="natural"
            dataKey="speed"
            stroke="#eee"
            strokeWidth={2}
            activeDot={{ fill: "var(--bg-color)", stroke: "none", r: 6 }}
          />
        </LineChart>
      </Card>
    </div>
  );
};

export default TestEnded;
