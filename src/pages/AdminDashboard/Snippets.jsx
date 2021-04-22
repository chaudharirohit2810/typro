import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import TypingLoader from "../../components/TypingLoader";
import configs from "../../config";
import Style from "../Dashboard/dashboard.module.scss";

const Dashboard = () => {
  const [loading, setloading] = useState(true);
  const [snippets, setsnippets] = useState([]);
  const toastId = React.useRef(null);

  const deleteSnippet = (id) => {
    const token = localStorage.getItem("admintoken");
    toastId.current = toast.dark("Deleting snippet....", { autoClose: 10000 });
    axios
      .delete(`${configs.BACKEND_URL}/snippets/${id}`, { headers: { token } })
      .then((res) => {
        setsnippets((prev) => {
          let temp = [...prev];
          const index = temp.findIndex((item) => item._id === id);
          if (index !== -1) {
            temp.splice(index, 1);
          }
          return temp;
        });
        toast.done(toastId.current);
        toast.dark("Snippet delete successfully");
      })
      .catch((err) => {
        toast.done(toastId.current);
        toast.error("Snippet Deletion failed");
      });
  };

  useEffect(() => {
    axios
      .get(`${configs.BACKEND_URL}/snippets/`)
      .then((res) => {
        setsnippets(res.data);
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
    <div className={Style.container}>
      {snippets.map?.((item) => {
        return (
          <Card
            key={item._id}
            style={{ width: "100%", maxWidth: "64rem", marginBottom: "1rem" }}
          >
            <h1>{item.language}</h1>
            <p style={{ whiteSpace: "pre-wrap" }}>{item.code}</p>
            <div style={{ marginTop: "1.5rem" }}>
              <button
                className="main__button"
                style={{ fontSize: "16px" }}
                onClick={() => {
                  deleteSnippet(item._id);
                }}
              >
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
