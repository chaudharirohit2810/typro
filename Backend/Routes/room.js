const mongoose = require("mongoose");
const { authenticateToken } = require("../jwt");
const router = require("express").Router();
const Snippet = require("../models/snippets");
const Room = require("../models/room");

router.route("/").post(async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    const { language } = req.body;
    const snippets = await Snippet.aggregate([
      { $match: { language } },
      { $sample: { size: 1 } },
    ]);
    res.status(200).send(snippets[0]._id);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route("/:room_id").get(authenticateToken, async (req, res) => {
  try {
    let room_id = req.params.room_id;
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
