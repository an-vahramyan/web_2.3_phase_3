const fs = require("node:fs/promises");
const path = require("node:path");

async function walk(messy, organized) {
  const entries = await fs.readdir(messy, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(messy, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath, organized);
    } else if (entry.isFile()) {
      //   console.log(fullPath);
      const parsed = path.parse(fullPath);
      const extension = parsed.ext.slice(1);
      let category;
      if (parsed.base.startsWith(".")) {
        category = "hidden";
      } else if (extension === "") {
        category = "no-extension";
      } else {
        category = extension;
      }
      const destinationDir = path.join(organized, category);
      await fs.mkdir(destinationDir, { recursive: true });
      const destinationPath = await getUniquePath(destinationDir, parsed.base);
      await fs.copyFile(fullPath, destinationPath);
    }
  }
}
async function getUniquePath(destinationDir, filename) {
  const { name, ext } = path.parse(filename);
  let candidate = path.join(destinationDir, filename);
  let counter = 1;
  while (true) {
    try {
      await fs.access(candidate);
      candidate = path.join(destinationDir, `${name}-${counter}${ext}`);
      counter++;
    } catch (err) {
      return candidate;
    }
  }
}
walk("./messy", "./organized");
