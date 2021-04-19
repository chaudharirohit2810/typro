const { authenticateAdminToken } = require("../jwt");
const Snippet = require("../models/snippets");
const router = require("express").Router();
const mongoose = require("mongoose");

router.route("/").post(authenticateAdminToken, async (req, res) => {
  try {
    // const snippetData = { ...req.body };
    const snippet = new Snippet(req.body);
    await snippet.save();
    res.status(200).send("Snippet saved successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.route("/").get(async (req, res) => {
  try {
    const snippets = await Snippet.find({});
    res.status(200).send(snippets);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw Error("Invalid code snippet id");
    }
    const snippet = await Snippet.findById(mongoose.Types.ObjectId(id));
    res.status(200).send(snippet);
  } catch (error) {
    res.status(400).send(err.message);
  }
});

router.route("/language/:language").get(async (req, res) => {
  try {
    const language = req.params.language;
    if (!language) {
      throw Error("Invalid language");
    }
    const snippets = await Snippet.aggregate([
      { $match: { language } },
      { $sample: { size: 1 } },
    ]);
    res.status(200).send(snippets[0]);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.route("/language/:language").delete(async (req, res) => {
  try {
    const lang = req.params.language;
    const result = await Snippet.remove({ language: lang });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route("/:id").delete(authenticateAdminToken, async (req, res) => {
  try {
    const id = req.params.id;
    const stat = await Snippet.findByIdAndRemove(id);
    res.status(200).send("Snippet deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
