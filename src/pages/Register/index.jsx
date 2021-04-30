import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/Card";
import TypingLoader from "../../components/TypingLoader";
import config from "../../config";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("C");
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

  function validateForm() {
    if (
      !(
        username.length > 3 &&
        username.length < 16 &&
        password.length > 5 &&
        password.length < 20 &&
        name.length >= 6 &&
        name.length <= 50 &&
        email.length > 0
      )
    ) {
      toast.error("Please enter correct details");
      return false;
    }
    if (password !== password2) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name is invalid");
      return false;
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      toast.error("Invalid email address");
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    toastId.current = toast.dark("Registering......", { autoClose: 10000 });
    axios
      .post(`${config.BACKEND_URL}/user/register`, {
        username,
        password,
        email,
        name,
        language,
      })
      .then((res) => {
        toast.dark("Successfully Registered! Redirecting to Login Page");
        his.replace("/login");
      })
      .catch((err) => {
        toast.error("Username already exists! Please use different username", {
          autoClose: 3000,
        });
      })
      .finally(() => {
        toast.done(toastId.current);
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
          Register
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" style={{ marginTop: "1rem" }}>
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
          <Form.Group controlId="name" style={{ marginTop: "1rem" }}>
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
          <Form.Group controlId="name" style={{ marginTop: "1rem" }}>
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
              Confirm Password:{" "}
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
          <Form.Group controlId="name" style={{ marginTop: "1rem" }}>
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Preffered Language:{""}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              type="name"
              as="select"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="Enter Name"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option style={{ color: "blue" }}>C</option>
              <option style={{ color: "blue" }}>C++</option>
              <option style={{ color: "blue" }}>Java</option>
              <option style={{ color: "blue" }}>Python</option>
              <option style={{ color: "blue" }}>Javascript</option>
            </Form.Control>
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
            Submit
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
