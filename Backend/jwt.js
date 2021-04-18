const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["token"];
  if (token == null) return res.status(401).send({ msg: "Permission Denied" });
  jwt.verify(token, process.env.KEY, (err, user) => {
    if (err) return res.status(401).send({ msg: err.message });
    req.user = user;
    next();
  });
};

const authenticateAdminToken = (req, res, next) => {
  const token = req.headers["token"];
  if (token == null) return res.status(401).send({ msg: "Permission Denied" });
  jwt.verify(token, process.env.ADMIN_KEY, (err, user) => {
    if (err) return res.status(401).send({ msg: err.message });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken, authenticateAdminToken };
