const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { readData, writeData } = require("../utils/fileDB");
const uuid = require("uuid");
const router = express.Router();

//create User
async function createUser(username, password) {
  const users = readData("./data", "users.json");
  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: uuid.v4(),
    role: "customer",
    username,
    passwordHash: hashed,
  };

  users.push(user);
  writeData("./data", "users.json", users);
}
//find User
async function findUser(username) {
  const users = readData("./data", "users.json");
  return users.find((u) => u.username === username);
}
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (await findUser(username)) {
    return res.status(400).json({ message: "user already exists" });
  }

  await createUser(username, password);
  res.json({ message: "user registred" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser(username);
  if (!user) return res.status(401).json({ message: "Invalid credentails" });

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentails" });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    },
  );

  res.json({ token });
});

// function authMiddleware(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) {
//     return res.sendStatus(401);
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.sendStatus(401);
//   }
// }

module.exports = router;
