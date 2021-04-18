const mongoose = require("mongoose");

const Snippet = new mongoose.Schema(
  {
    language: {
      type : String,
      required : true
    }, 
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    summary: {
      type: String, 
      required: true
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("snippet", Snippet);
