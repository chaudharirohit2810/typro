require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

const routes = ["user", "stats", "room"];

routes.map((route) => {
  app.use(`/api/${route}`, require(`./Routes/${route}`));
});

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });

io.on("connection", (socket) => {
  socket.on("send_typing_score", (data) => {
    const { token, ...mainData } = data;
    io.emit("get_peer_typing_scores", mainData);
  });

  socket.on("peer_added", (data) => {
    io.emit("get_peer_typing_scores", { speed: 0, username: data["username"] });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port " + process.env.PORT || 5000);
});
