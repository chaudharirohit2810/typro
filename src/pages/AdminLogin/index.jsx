import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/Card";
import config from "../../config";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const his = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${config.BACKEND_URL}/admin/login`, { username, password })
      .then((res) => {
        localStorage.setItem("admintoken", res.data.token);
        toast.dark("Admin Login successful");
        his.replace("/admindashboard");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Invalid username or password", { autoClose: 3000 });
      });
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
          Admin
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
            Admin
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginLeft: "10px", fontSize: "18px" }}
            />
          </Button>
        </Form>
      </Card>
    </div>
  );
}
