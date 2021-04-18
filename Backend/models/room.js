const mongoose = require("mongoose");

const room = mongoose.Schema(
  {
    room_id: {
      type: String,
      required: true,
    },
    users: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rooms", room);
