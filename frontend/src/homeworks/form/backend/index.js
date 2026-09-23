const express = require("express");
const router = require("./router");
const app = express();
app.use("/users", router);
const port = 4005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
