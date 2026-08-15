const fs = require("fs/promises");
const path = require("path");
const logPath = process.argv[2];
const limit = Number(process.argv[3]);
async function rotateLog(logPath, limit) {
  try {
    const stats = await fs.stat(logPath);

    if (stats.size <= limit) {
      console.log(
        `${logPath} is ${stats.size} bytes -- under the limit, no rotation needed`,
      );
      return;
    }

    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const { name, ext } = path.parse(logPath);
    const archiveName = `${name}-${timestamp}${ext}`;
    const archivePath = path.join(path.dirname(logPath), archiveName);
    await fs.rename(logPath, archivePath);
    await fs.writeFile(logPath, "");
    console.log(`Rotated: ${logPath} -> ${archivePath} (fresh log created)`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`${logPath} nothing to rotate`);
      return;
    }

    throw error;
  }
}
rotateLog(logPath, limit);
