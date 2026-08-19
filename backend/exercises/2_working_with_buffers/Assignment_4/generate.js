const fs = require("node:fs");

const TOTAL_LINES = 100_000;
const levels = ["ERROR", "WARN", "INFO"];
const output = fs.createWriteStream("server.log");

function randomLevel() {
  const index = Math.floor(Math.random() * levels.length);

  return levels[index];
}

function randomMessage(level) {
  if (level === "ERROR") {
    return "Connection timed out";
  }
  if (level === "WARN") {
    return "Retry attempt 2";
  }

  return "Request handled in 42ms";
}

let currentTime = Date.now();

for (let i = 0; i < TOTAL_LINES; ++i) {
  currentTime += Math.floor(Math.random() * 10_000);

  const timestamp = new Date(currentTime).toISOString();
  const level = randomLevel();
  const message = randomMessage(level);

  const line = `${timestamp} [${level}] ${message}\n`;

  output.write(line);
}

output.end();

output.on("finish", () => {
  console.log(`Generated ${TOTAL_LINES} lines.`);
});
