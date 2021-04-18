const mongoose = require("mongoose");

const Snippet = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
});

module.exports = mongoose.model("snippet", Snippet);
