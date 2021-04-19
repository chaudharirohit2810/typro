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

export default function AddSnippet() {
  const [snippet, setSnippet] = useState("");
  const [language, setLangugae] = useState("C");
  const [url, setUrl] = useState("");

  const his = useHistory();

  function handleSubmit(event) {
    const token = localStorage.getItem("token");
    event.preventDefault();
    let temp = snippet.split("    ");
    let code = "";
    for (let str of temp) {
      code += str;
      code += "\t";
    }
    code = code.substr(0, code.length - 1);
    temp = code.split("\n");
    code = "";
    for (let str of temp) {
      code += str;
      code += "↵\n";
    }
    axios
      .post(
        `${config.BACKEND_URL}/snippets/`,
        {
          code,
          language,
          url,
        },
        {
          headers: {
            token: localStorage.getItem("admintoken"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.dark("Code snippet added successfully");
        setSnippet("");
        setUrl("");
        setLangugae("C");
        // his.replace("/admindashboard");
      })
      .catch((err) => {
        toast.error("Something went wrong! Please try again", {
          autoClose: 3000,
        });
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
          Add New Snippet
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="text">
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Code Snippet:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              as="textarea"
              rows="10"
              type="text"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="Place the code snippet here"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="text" style={{ marginTop: "1rem" }}>
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Language:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              as="select"
              style={{ width: "90%" }}
              value={language}
              className="main__input"
              placeholder="Select language"
              onChange={(e) => setLangugae(e.target.value)}
            >
              <option style={{ color: "blue" }}>C</option>
              <option style={{ color: "blue" }}>C++</option>
              <option style={{ color: "blue" }}>Java</option>
              <option style={{ color: "blue" }}>Python</option>
              <option style={{ color: "blue" }}>Javascript</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="text" style={{ marginTop: "1rem" }}>
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Url:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              type="text"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="type the reference url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
            Add
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
