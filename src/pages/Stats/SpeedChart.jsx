import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import Card from "../../components/Card";

const SpeedChart = ({ data, dataKey, domainValue }) => {
  const customTooltipOnYourLine = (e) => {
    if (e.active && e.payload != null && e.payload[0] != null) {
      return (
        <div
          className="custom-tooltip"
          style={{ backgroundColor: "var(--bg-color)", padding: "0px 5px" }}
        >
          <p>{e.payload[0].payload[dataKey]}</p>
        </div>
      );
    } else {
      return "";
    }
  };
  return (
    <Card style={{ margin: "0.5rem 0rem", flex: 1, minWidth: "300px" }}>
      <h1 style={{ textAlign: "center" }}>
        {dataKey.substr(0, 1).toUpperCase() +
          dataKey.substr(1, dataKey.length - 1)}{" "}
        vs Time
      </h1>
      {/* <div style={{  }}> */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis dataKey="createdAt"></XAxis>
          <YAxis domain={domainValue}></YAxis>
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
            dataKey={dataKey}
            stroke="#eee"
            strokeWidth={2}
            activeDot={{ fill: "var(--bg-color)", stroke: "none", r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* </div> */}
    </Card>
  );
};

export default SpeedChart;
