import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const his = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0 && password === password2 && name.length > 0 && email.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${config.BACKEND_URL}/user/register`, {username, password, email, name})
      .then((res) => {
        console.log(res);
        toast.dark("Successfully Registered! Redirecting to Login Page");
        his.replace("/login");
      })
      .catch((err) => {
        toast.error("Something went Wrong", { autoClose: 3000 });
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
          Register
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
          <Form.Group controlId="name">
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Email:{""}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              type="name"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Name:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              type="name"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setPassword1(e.target.value)}
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
              value={password2}
              className="main__input"
              placeholder="Verify the password"
              onChange={(e) => setPassword2(e.target.value)}
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
            disabled={!validateForm()}
            className="main__button"
          >
            Submit
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginLeft: "10px", fontSize: "18px" }}
            />
          </Button>
        </Form>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </div>
  );
}
