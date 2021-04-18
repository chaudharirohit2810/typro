const { authenticateAdminToken } = require("../jwt");
const Snippet = require("../models/snippets");
const router = require("express").Router();

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
    res.status(200).send({ snippets });
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
