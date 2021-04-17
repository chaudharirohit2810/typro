require("dotenv").config();

// MONGO_URI="mongodb+srv://pragati:lifeisdream@cluster0.leojn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const routes = ["user", "stats"];

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
  .catch(() => {
    console.log("MongoDB connection failed");
  });

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
