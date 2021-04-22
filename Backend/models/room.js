const mongoose = require("mongoose");

const room = new mongoose.Schema(
  {
    room_id: {
      type: String,
      required: true,
    },
    users: {
      type: [String],
    },
    expire_at: { type: Date, default: Date.now, expires: 7200 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rooms", room);
