import React, { useState } from "react";
import Card from "../../components/Card";
import { Form } from "react-bootstrap";
import axios from "axios";
import configs from "../../config";
import { toast } from "react-toastify";

const UserCard = ({ user }) => {
  const [language, setLanguage] = useState(user.language);
  const toastId = React.useRef(null);

  const updateLang = () => {
    toastId.current = toast.dark("Updating language......", {
      autoClose: 10000,
    });
    axios
      .put(
        `${configs.BACKEND_URL}/user/lang/${language}`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((res) => {
        toast.dismiss(toastId.current);
        localStorage.setItem("lang", language);
        toast.dark("Language updated successfully!");
      })
      .catch((err) => {
        console.log(err.message);
        toast.dismiss(toastId.current);
        toast.error("Something went wrong");
      });
  };
  return (
    <Card style={{ margin: "0px auto", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          //   border: "2px solid red",
        }}
      >
        <div
          style={{
            display: "flex",
            justifySelf: "start",
            alignSelf: "start",
            marginRight: "2rem",
            marginTop: "1.5rem",
            marginLeft: "2rem",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#181b22",
            }}
          >
            <h1 style={{ fontSize: "60px" }}>
              {user && user.name && user.name.substr(0, 1)}
            </h1>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <h1 style={{ marginBottom: "0.5rem" }}>{user.name}</h1>
          <span style={{ display: "block" }}>
            <b>Username</b>: {user.username}
          </span>
          <span style={{ display: "block" }}>
            <b>Email</b>: {user.email}
          </span>
          <span>
            <b>Total tests</b>: {user.totaltests}
          </span>
          <Form.Group
            controlId="name"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              width: "50%",
              maxWidth: "400px",
            }}
          >
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Change preferred language:{""}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              type="name"
              as="select"
              style={{ width: "70%" }}
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
          <button className="main__button" onClick={updateLang}>
            Update user
          </button>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
