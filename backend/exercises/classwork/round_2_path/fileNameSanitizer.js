const path = require("node:path");
const fs = require("fs");

const sanitizer = (fileName) => {
  const { name, ext } = path.parse(fileName);

  const cleanExt = ext.toLowerCase();

  const cleanBase = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleanBase + cleanExt;
};

const files = fs.readdirSync("input");
fs.mkdirSync("output", { recursive: true });

for (const file of files) {
  const cleanName = sanitizer(file);

  console.log(cleanName);
  const inputPath = path.join("input", file);
  const outputPath = path.join("output", cleanName);
  fs.copyFileSync(inputPath, outputPath);
}
