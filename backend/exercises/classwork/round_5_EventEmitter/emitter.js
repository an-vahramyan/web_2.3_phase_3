const EventEmitter = require("node:events");

class Downloader extends EventEmitter {
  constructor() {
    super();
  }
  start() {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const percentage = step * 10;

      this.emit("progress", percentage);

      if (percentage === 100) {
        clearInterval(interval);
        this.emit("done");
      }
    }, 500);
  }
}
const downloader = new Downloader();
downloader.on("progress", (percentage) => {
  const total = 20;
  const filled = Math.floor((percentage / 100) * total);
  const filledBar = "#".repeat(filled);
  const empty = "-".repeat(total - filled);
  const bar = `[${filledBar}${empty}] ${percentage}%`;
  process.stdout.write("\r" + bar);
});
downloader.on("done", () => {
  console.log("\nDownload complete");
});
downloader.start();
