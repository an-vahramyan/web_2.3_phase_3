const fs = require("node:fs");
const path = require("node:path");

function readData(_dirname, _filename) {
  const filePath = path.join(_dirname, _filename);

  try {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    return JSON.parse(data);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
function writeData(_dirname, _filename, data) {
  const filePath = path.join(_dirname, _filename);

  try {
    const strData = JSON.stringify(data);
    fs.writeFileSync(filePath, strData, "utf8");
  } catch (err) {
    console.error(`Error:${err}`);
  }
}
module.exports = { readData, writeData };
