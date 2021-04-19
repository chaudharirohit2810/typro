import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import ProgressBar from "./ProgressBar";

const Peers = ({ socket, defaultPeers }) => {
  const [peers, setPeers] = useState([]);
  useEffect(() => {
    socket.on("get_peer_typing_scores", (data) => {
      setPeers((prev) => {
        let index = prev.findIndex((item) => item.username === data.username);
        if (index === -1) {
          return [...prev, data];
        } else {
          prev[index].speed = data.speed;
          return [...prev];
        }
      });
    });
  }, []);
  return (
    <Card
      style={{
        maxWidth: "50rem",
        padding: "1rem 1rem",
        width: "90%",
        marginBottom: "2rem",
      }}
    >
      {peers.map((peer) => (
        <ProgressBar
          key={peer.username}
          completed={peer.speed}
          bgcolor={"#ee6352"}
          label={peer.username}
        />
      ))}
      {defaultPeers.map((peer) => {
        return (
          <div key={peer.username}>
            {!peers.find((item) => item.username === peer.username) && (
              <ProgressBar
                completed={peer.speed}
                bgcolor={"#ee6352"}
                label={peer.username}
              />
            )}
          </div>
        );
      })}
    </Card>
  );
};

export default Peers;
