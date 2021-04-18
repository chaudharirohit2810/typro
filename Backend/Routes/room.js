const mongoose = require("mongoose");
const authenticateToken = require("../jwt");
const router = require("express").Router();
const Room = require("../models/room");
const User = require("../models/user");

router.route("/").post(async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(200).send("Room created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route("/:room_id").get(authenticateToken, async (req, res) => {
  try {
    let room_id = req.params.room_id;
    const userid = req.user.id;
    let room = await Room.findOne({ room_id });
    if (!room) {
      throw Error("Invalid room id");
    }
    let { _id, ...roomObj } = room._doc;
    if (!roomObj.users.find((item) => item === userid)) {
      roomObj.users.push(userid);
    }
    let result = await Room.findByIdAndUpdate(_id, roomObj);
    result = JSON.stringify(result);
    result = JSON.parse(result);
    let users = [];
    if (result.users) {
      users = await Promise.all(
        result.users.map(async (item) => {
          const user = await User.findById(mongoose.Types.ObjectId(item));
          return { speed: 0, username: user._doc.username };
        })
      );
    }
    res.status(200).send(users);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

module.exports = router;
