const fs = require("fs");
const stream = fs.createReadStream("input.txt", { encoding: "utf8" });

let wordCount = 0;
let remainder = "";

stream.on("data", (chunk) => {
  const res = remainder + chunk;

  const parts = res.split(/\s+/);

  //   remainder = parts.pop();
  if (/\s$/.test(res)) {
    remainder = "";
  } else {
    remainder = parts.pop();
  }

  for (const word of parts) {
    if (word.length > 0) {
      wordCount++;
    }
  }
});

stream.on("end", () => {
  if (remainder.length > 0) {
    wordCount++;
  }
  console.log(wordCount);
});

stream.on("error", (error) => {
  console.log(error);
});
