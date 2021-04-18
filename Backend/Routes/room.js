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
    res.status(200).send("Room exists");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

module.exports = router;
