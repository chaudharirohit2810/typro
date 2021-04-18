const Admin = require("../models/admin");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { authenticateAdminToken } = require("../jwt");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw Error("User not found");
    }
    if (!admin.validPassword(password)) {
      throw Error("Invalid password");
    }
    jwt.sign(
      {
        username: req.body.username,
        password: password,
        id: admin._doc._id,
      },
      process.env.ADMIN_KEY,
      {
        expiresIn: 60 * 60 * 60,
      },
      (err, token) => {
        if (err) {
          throw Error(err.message);
        } else {
          const { password, salt, ...resUser } = admin._doc;
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
    const admin = new Admin(req.body);
    admin.setPassword(req.body.password);
    await admin.save();
    res.status(201).send("Admin registration successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route("/verify").get(authenticateAdminToken, (req, res) => {
  return res.status(200).send("Verification successful");
});

module.exports = router;
