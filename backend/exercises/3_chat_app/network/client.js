const net = require("node:net");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

require("dotenv").config({ quiet: true });

const rline = readline.createInterface({ input, output });
const socket = net.createConnection(process.env.PORT, "127.0.0.1", () => {
  console.log("connected to server\n");

  rline.question("Enter your username:", (username) => {
    socket.write(`${username}\n`);
  });
});
socket.on("data", (data) => {
  const message = data.toString().trim();
  console.log(message);
  if (message.startsWith("Username accepted")) {
    rline.on("line", (message) => {
      socket.write(`${message}\n`);
    });
  }
});

socket.on("close", () => {
  console.log("server disconnected");
});

socket.on("error", (err) => {
  console.error("Socket error:", err.code);
});

