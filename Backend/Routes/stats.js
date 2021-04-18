const { authenticateToken } = require("../jwt");
const Stats = require("../models/stats");
const User = require("../models/user");
const router = require("express").Router();

router.route("/").post(authenticateToken, async (req, res) => {
  try {
    const statData = { ...req.body, userid: req.user.id };
    const Stat = new Stats(statData);
    await Stat.save();
    res.status(200).send("Stats saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route("/").get(authenticateToken, async (req, res) => {
  try {
    const userid = req.user.id;
    const stats = await Stats.find({ userid });
    const restUser = await User.findById(userid);
    const { password, salt, ...user } = restUser._doc;

    res.status(200).send({ stats, user });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route("/:id").delete(authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const stat = await Stats.findByIdAndRemove(id);
    res.status(200).send("Stat deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
