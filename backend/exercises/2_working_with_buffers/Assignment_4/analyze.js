const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "server.log");

let linesProcessed = 0;
let errorCount = 0;
let warnCount = 0;
let infoCount = 0;

let lastErrorTimestamp = null;
let longestGap = 0;
let longestGapStart = null;
let longestGapEnd = null;

let leftover = "";
const stream = fs.createReadStream(filePath, { encoding: "utf8" });

stream.on("data", (chunk) => {
  const data = leftover + chunk;

  const lines = data.split("\n");
  leftover = lines.pop();

  for (const line of lines) {
    processLine(line);
  }
});

function processLine(line) {
  if (!line.trim()) {
    return;
  }

  const timestampEnd = line.indexOf(" ");
  const timestamp = line.slice(0, timestampEnd);

  const levelStart = line.indexOf("[");
  const levelEnd = line.indexOf("]");

  const level = line.slice(levelStart + 1, levelEnd);

  linesProcessed++;

  if (level === "ERROR") {
    errorCount++;

    const currentErrorTime = new Date(timestamp);

    if (lastErrorTimestamp !== null) {
      const previousErrorTime = new Date(lastErrorTimestamp);

      const gapMilliseconds = currentErrorTime - previousErrorTime;
      const gapSecond = gapMilliseconds / 1000;

      if (gapSecond > longestGap) {
        longestGap = gapSecond;

        longestGapStart = lastErrorTimestamp;

        longestGapEnd = timestamp;
      }
    }

    lastErrorTimestamp = timestamp;
  } else if (level === "WARN") {
    warnCount++;
  } else if (level === "INFO") {
    infoCount++;
  }
}

stream.on("end", () => {
  if (leftover.length > 0) {
    processLine(leftover);
  }

  console.log("\n--- Log Analysis Report");
  console.log(`Lines processed: ${linesProcessed}`);
  console.log(`ERROR: ${errorCount}`);
  console.log(`WARN: ${warnCount}`);
  console.log(`INFO: ${infoCount}`);

  console.log(`Longest gap between Errors: ${longestGap} seconds`);

  if (longestGapStart !== null) {
    console.log(`Between ${longestGapStart} and ${longestGapEnd}`);
  }
});
