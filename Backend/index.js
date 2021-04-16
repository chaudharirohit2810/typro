require("dotenv").config();

// MONGO_URI="mongodb+srv://pragati:lifeisdream@cluster0.leojn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRouter = require("./Routes/User");

app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
