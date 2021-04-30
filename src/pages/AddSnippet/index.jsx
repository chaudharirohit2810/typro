import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/Card";
import TypingLoader from "../../components/TypingLoader";
import config from "../../config";

export default function AddSnippet() {
  const [snippet, setSnippet] = useState("");
  const [language, setLangugae] = useState("C");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const toastId = React.useRef(null);

  const validate = () => {
    if (snippet.length === 0 || url.length === 0) {
      toast.error("Please enter all details");
      return false;
    }
    if (snippet.length < 50 || snippet.length > 400) {
      toast.error("Snippet length should be between 50 to 400");
      return false;
    }
    if (url.length > 50) {
      toast.error("Url length should be between 0 to 50");
      return false;
    }
    return true;
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    toastId.current = toast.dark("Adding snippet......", { autoClose: 10000 });

    let temp = snippet.split("  ");
    let code = "";
    for (let str of temp) {
      str = str.replace(/^ +| +$/gm, "");
      if (!str.startsWith("//") && str.length > 0) {
        code += str;
        code += "\t";
      }
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
        toast.done(toastId.current);
        toast.dark("Code snippet added successfully");
        setSnippet("");
        setUrl("");
        setLangugae("C");
        // his.replace("/admindashboard");
      })
      .catch((err) => {
        toast.done(toastId.current);
        toast.error("Something went wrong! Please try again", {
          autoClose: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <Card
        style={{
          maxWidth: "40rem",
          width: "90vw",
          display: "flex",
          justifyContent: "center",
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
              title="snippet"
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
              title="language_selector"
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
              title="url"
              placeholder="type the reference url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            title="submit"
            style={{
              marginTop: "1.5rem",
              boxShadow: "none",
              outline: "none",
              border: "none",
              width: "125px",
              padding: "8px 10px",
              cursor: "pointer",
            }}
            disabled={loading}
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
