import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Wow");
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
          <Form.Group controlId="email">
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Email:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              type="email"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            disabled={!validateForm()}
            className="main__button"
          >
            Login
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginLeft: "10px", fontSize: "18px" }}
            />
          </Button>
          <Link
            to="/"
            style={{
              display: "block",
              marginTop: "1rem",
              color: "var(--text-color)",
            }}
          >
            Not a User? Register
          </Link>
        </Form>
        {/* </div> */}
      </Card>
    </div>
  );
}
