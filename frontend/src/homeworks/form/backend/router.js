const express = require("express");
const router = express.Router();
// const crypto = require("node:crypto");
const users = [];
// const hash = crypto.createHash("sha256");

// hash.on("readable", () => {
//   const data = hash.read().toString("hex");
// });
// hash.end();
router.get("/", (req, res) => {
  res.send(users);
});
router.post("/", (req, res) => {
  const user = {
    id: users.length + 1,
    ...req.body,
  };
  users.push(user);
  res.status(201).send(user);
});

module.exports = router;
