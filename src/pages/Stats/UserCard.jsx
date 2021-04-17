import React from "react";
import Card from "../../components/Card";

const UserCard = ({ user }) => {
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
            justifyContent: "center",
            alignItems: "center",
            marginRight: "2rem",
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
            <h1 style={{ fontSize: "60px" }}>{user.name.substr(0, 1)}</h1>
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
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
