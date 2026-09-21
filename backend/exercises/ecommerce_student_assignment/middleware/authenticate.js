const jwt = require("jsonwebtoken");
// const authorize = require("./authorize");

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.sendStatus(401);
  }
}

module.exports = authenticate;
