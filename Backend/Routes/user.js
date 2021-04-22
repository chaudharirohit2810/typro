const User = require("../models/user");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { authenticateToken } = require("../jwt");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw Error("User not found");
    }
    if (!user.validPassword(password)) {
      throw Error("Invalid password");
    }
    jwt.sign(
      {
        username: req.body.username,
        password: password,
        id: user._doc._id,
      },
      process.env.KEY,
      {
        expiresIn: 60 * 60 * 60,
      },
      (err, token) => {
        if (err) {
          throw Error(err.message);
        } else {
          const { password, salt, ...resUser } = user._doc;
          return res.status(200).send({
            token: token,
            msg: "Authentication successful",
            user: resUser,
          });
        }
      }
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route("/register").post(async (req, res) => {
  try {
    const user = new User(req.body);
    user.setPassword(req.body.password);
    await user.save();
    res.status(201).send("User registration successful");
  } catch (error) {
    console.log(req.body);
    res.status(400).send(error.message);
  }
});

router.route("/lang/:language").put(authenticateToken, async (req, res) => {
  try {
    const id = req.user.id;
    const language = req.params.language;
    if (!id || !language) {
      throw Error("Invalid id or language");
    }
    const user = await User.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
      $set: { language: language },
    });
    res.status(200).send("Language updated");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.route("/verify").get(authenticateToken, (req, res) => {
  return res.status(200).send("Verification successful");
});

module.exports = router;
