require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const jwt = require("jsonwebtoken");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const Room = require("./models/room");

app.use(cors());
app.use(express.json());

const routes = ["user", "stats", "room", "admin", "snippets"];

routes.map((route) => {
  app.use(`/api/${route}`, require(`./Routes/${route}`));
});

const removeUser = async ({ token, room_id }) => {
  try {
    let userid = undefined;
    jwt.verify(token, process.env.KEY, (err, user) => {
      if (err) return;
      userid = user.id;
    });
    if (!userid) {
      throw Errro("Invalid user id");
    }
    const room = await Room.findOne({ room_id });
    if (!room) {
      throw Error("Invalid room id");
    }
    const users = room._doc.users;
    const index = users.findIndex((item) => item === userid);
    const newusers = users.splice(index, 1);
    if (newusers.length === 0) {
      await Room.findOneAndDelete({ room_id });
      console.log("Delete successful");
    } else {
      let newroom = { ...room._doc, users: newusers };
      await Room.findOneAndUpdate({ room_id }, newroom);
      console.log("Update successful");
    }
    console.log(index);
  } catch (error) {}
};

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("MongoDB connection failed");
  });

var sockets = [];
io.on("connection", function (socket) {
  const id = socket.id;

  socket.on("user-join", function (data) {
    sockets[id] = res.id;
  });

  socket.on("disconnect", function (data) {
    io.emit("user-unjoin", { user_id: sockets[id], status: "offline" });
  });
});

io.on("connection", (socket) => {
  let id = socket.id;
  socket.on("send_typing_score", (data) => {
    const { token, ...mainData } = data;
    io.to(mainData.room_id).emit("get_peer_typing_scores", mainData);
  });

  socket.on("peer_added", (data) => {
    socket.join(data.room_id);
    sockets[id] = { token: data.token, room_id: data.room_id };
    io.in(data.room_id).emit("get_peer_typing_scores", {
      speed: 0,
      username: data["username"],
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // removeUser(sockets[id]);
  });
});

http.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port " + process.env.PORT || 5000);
});
