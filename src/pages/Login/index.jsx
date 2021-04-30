import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/Card";
import config from "../../config";
import TypingLoader from "../../components/TypingLoader";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(true);
  const toastId = React.useRef(null);

  const his = useHistory();

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (!token) {
      setloading(false);
      return;
    }
    axios
      .get(config.BACKEND_URL + "/user/verify", {
        headers: { token: token },
      })
      .then((response) => {
        his.replace("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    toastId.current = toast.dark("Authenticating......", { autoClose: 10000 });
    axios
      .post(`${config.BACKEND_URL}/user/login`, { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("lang", res.data.user.language);
        toast.dark("Login successful!");
        his.replace("/");
      })
      .catch((err) => {
        toast.error("Invalid username or password", { autoClose: 3000 });
      })
      .finally(() => {
        toast.dismiss(toastId.current);
      });
  }

  if (loading) {
    return (
      <div
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
        display: "flex",
        height: "95vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: "40rem",
          width: "90vw",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ margin: "0", padding: "0", marginBottom: "1.5rem" }}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
          Login
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Username:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              type="name"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            size="lg"
            controlId="password"
            style={{ marginTop: "1rem" }}
          >
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Password:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              type="password"
              style={{ width: "90%" }}
              value={password}
              className="main__input"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            style={{
              marginTop: "1.5rem",
              boxShadow: "none",
              outline: "none",
              border: "none",
              width: "125px",
              padding: "8px 10px",
              cursor: "pointer",
            }}
            // disabled={!validateForm()}
            className="main__button"
          >
            Login
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginLeft: "10px", fontSize: "18px" }}
            />
          </Button>
          <Link
            to="/register"
            style={{
              display: "block",
              marginTop: "1rem",
              color: "var(--text-color)",
            }}
          >
            Not a User? Register
          </Link>
          <Link
            to="/guest"
            style={{
              display: "block",
              marginTop: "1rem",
              color: "var(--text-color)",
            }}
          >
            Just want to try it out? Guest Login
          </Link>
        </Form>
      </Card>
    </div>
  );
}
