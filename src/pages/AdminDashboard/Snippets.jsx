import React, { useState, useEffect } from "react";
import { faEraser, faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import TypingLoader from "../../components/TypingLoader";
import Card from "../../components/Card";
import configs from "../../config";
import Style from "../Dashboard/dashboard.module.scss";
import DashBoardCard from "../Dashboard/DashboardCard";

const Dashboard = () => {
  const [loading, setloading] = useState(true);
  const [snippets, setsnippets] = useState([]);

  useEffect(() => {
    axios
      .get(`${configs.BACKEND_URL}/snippets/`)
      .then((res) => {
        // console.log(res.data);
        console.log(res.data);
        setsnippets(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("finish");
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
    <div className={Style.container}>
      {snippets.map?.((item) => {
        return (
          <Card
            style={{ width: "100%", maxWidth: "64rem", marginBottom: "1rem" }}
          >
            <h1>{item.language}</h1>
            <p style={{ whiteSpace: "pre-wrap" }}>{item.code}</p>
            <div style={{ marginTop: "1.5rem" }}>
              <button className="main__button" style={{ fontSize: "16px" }}>
                <FontAwesomeIcon
                  icon={faEraser}
                  style={{ marginRight: "0.5rem", fontSize: "18px" }}
                />
                Delete Snippet
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Dashboard;
