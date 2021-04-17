const mongoose = require("mongoose");

const Stats = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    code_snippet_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stats", Stats);
