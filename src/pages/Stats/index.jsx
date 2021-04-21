import axios from "axios";
import React, { useEffect, useState } from "react";
import TypingLoader from "../../components/TypingLoader";
import configs from "../../config";
import SpeedChart from "./SpeedChart";
import UserCard from "./UserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import Style from "../Dashboard/dashboard.module.scss";

const Stats = () => {
  const [loading, setloading] = useState(true);
  const [stats, setStats] = useState([]);
  const [user, setUser] = useState({});
  const [speedDomain, setSpeedDomain] = useState([0, 0]);
  const [accuracyDomain, setAccuracyDomain] = useState([0, 0]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${configs.BACKEND_URL}/stats/`, { headers: { token } })
      .then((res) => {
        setUser({ ...res.data.user, totaltests: res.data.stats.length });
        if (res.data.stats.length === 0) {
          return;
        }
        let tempStats = res.data.stats.map((stat) => ({
          ...stat,
          createdAt: new Date(stat.createdAt).toLocaleString(),
        }));
        setStats(tempStats);
        setSpeedDomain([
          res.data.stats.reduce(
            (min, p) => (p.speed < min ? p.speed : min),
            res.data.stats[0].speed
          ) - 15,
          res.data.stats.reduce(
            (max, p) => (p.speed > max ? p.speed : max),
            res.data.stats[0].speed
          ) + 15,
        ]);
        setAccuracyDomain([
          res.data.stats.reduce(
            (min, p) => (p.accuracy < min ? p.accuracy : min),
            res.data.stats[0].accuracy
          ) - 5,
          Math.min(
            res.data.stats.reduce(
              (max, p) => (p.accuracy > max ? p.accuracy : max),
              res.data.stats[0].accuracy
            ) + 10,
            100
          ),
        ]);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className={Style.container}
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
        maxWidth: "80rem",
        margin: "0px auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <FontAwesomeIcon icon={faChartLine} size="5x" />
      <h1 className={Style.title} style={{ marginBottom: "0" }}>
        Checkout your progress
      </h1>
      <p
        className={Style.subtitle}
        style={{ color: "var(--subtitle-color)", marginTop: "0" }}
      >
        Monitor your progress over the period to check how you have improved
        your typing speed
      </p>
      <div style={{ height: "20px" }}></div>
      <UserCard user={user} />
      <div style={{ height: "20px" }}></div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          paddingBottom: "2rem",
          flexDirection: stats.length > 20 ? "column" : "row",
        }}
      >
        <SpeedChart data={stats} dataKey={"speed"} domainValue={speedDomain} />
        <div style={{ width: "10px" }} />
        <SpeedChart
          data={stats}
          dataKey={"accuracy"}
          domainValue={accuracyDomain}
        />
      </div>
    </div>
  );
};

export default Stats;
