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
var timeouts = [];

const removeRoom = async (room_id) => {
  try {
    timeouts[room_id] = setTimeout(async () => {
      await Room.findOneAndDelete({ room_id });
      console.log("Delete successful");
    }, 10000);
  } catch (error) {
    console.log(`Remove room: ${error.message}`);
  }
};

const checkRoomValid = (room_id) => {
  for (let key of Object.keys(sockets)) {
    if (sockets[key].room_id === room_id) {
      return;
    }
  }
  removeRoom(room_id);
};

io.on("connection", (socket) => {
  let id = socket.id;
  socket.on("send_typing_score", (data) => {
    const { room_id, ...mainData } = data;
    io.to(room_id).emit("get_peer_typing_scores", mainData);
  });

  socket.on("peer_added", (data) => {
    socket.join(data.room_id);
    if (sockets[id]) {
      sockets[id].push({ room_id: data.room_id });
    } else {
      sockets[id] = [{ room_id: data.room_id }];
    }
    if (timeouts[data.room_id]) {
      clearTimeout(timeouts[data.room_id]);
    }
    io.in(data.room_id).emit("get_peer_typing_scores", {
      speed: 0,
      username: data["username"],
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    if (sockets[id]) {
      let room_id = sockets[id].room_id;
      delete sockets[id];
      checkRoomValid(room_id);
    }
  });
});

http.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port " + process.env.PORT || 5000);
});

//
