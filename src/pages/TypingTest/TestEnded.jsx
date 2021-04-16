import React from "react";
// import { LineChart, AreaChart } from "react-chartkick";
import { LineChart, XAxis, YAxis, Tooltip, Line, Label } from "recharts";
import "chartkick/chart.js";
import Card from "../../components/Card";

const TestEnded = ({ speed, data }) => {
  const tempData = [
    {
      time: "1 sec",
      speed: 48,
    },
    {
      time: "1 sec",
      speed: 48,
    },
    {
      time: "2 sec",
      speed: 144,
    },
    {
      time: "2 sec",
      speed: 144,
    },
    {
      time: "3 sec",
      speed: 120,
    },
    {
      time: "3 sec",
      speed: 120,
    },
    {
      time: "4 sec",
      speed: 104,
    },
    {
      time: "4 sec",
      speed: 104,
    },
    {
      time: "5 sec",
      speed: 99,
    },
    {
      time: "5 sec",
      speed: 99,
    },
    {
      time: "6 sec",
      speed: 98,
    },
    {
      time: "6 sec",
      speed: 98,
    },
    {
      time: "7 sec",
      speed: 100,
    },
    {
      time: "7 sec",
      speed: 100,
    },
    {
      time: "8 sec",
      speed: 97,
    },
    {
      time: "8 sec",
      speed: 97,
    },
    {
      time: "9 sec",
      speed: 87,
    },
    {
      time: "9 sec",
      speed: 87,
    },
    {
      time: "10 sec",
      speed: 85,
    },
    {
      time: "10 sec",
      speed: 85,
    },
    {
      time: "11 sec",
      speed: 82,
    },
    {
      time: "11 sec",
      speed: 82,
    },
    {
      time: "12 sec",
      speed: 79,
    },
    {
      time: "12 sec",
      speed: 79,
    },
    {
      time: "13 sec",
      speed: 79,
    },
    {
      time: "13 sec",
      speed: 79,
    },
    {
      time: "14 sec",
      speed: 73,
    },
    {
      time: "14 sec",
      speed: 73,
    },
    {
      time: "15 sec",
      speed: 75,
    },
    {
      time: "15 sec",
      speed: 75,
    },
    {
      time: "16 sec",
      speed: 75,
    },
    {
      time: "16 sec",
      speed: 75,
    },
    {
      time: "17 sec",
      speed: 74,
    },
    {
      time: "17 sec",
      speed: 74,
    },
    {
      time: "18 sec",
      speed: 74,
    },
    {
      time: "18 sec",
      speed: 74,
    },
    {
      time: "19 sec",
      speed: 70,
    },
    {
      time: "19 sec",
      speed: 70,
    },
    {
      time: "20 sec",
      speed: 68,
    },
    {
      time: "20 sec",
      speed: 68,
    },
    {
      time: "21 sec",
      speed: 70,
    },
    {
      time: "21 sec",
      speed: 70,
    },
    {
      time: "22 sec",
      speed: 72,
    },
    {
      time: "22 sec",
      speed: 72,
    },
    {
      time: "23 sec",
      speed: 69,
    },
    {
      time: "23 sec",
      speed: 69,
    },
  ];

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
      <h1 style={{ textAlign: "center" }}>Typing test Ended</h1>
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
