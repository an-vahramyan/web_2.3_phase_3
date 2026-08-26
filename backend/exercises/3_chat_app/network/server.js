const { watchFile } = require("node:fs");
const net = require("node:net");

require("dotenv").config({ quiet: true });

const clients = new Map();

const broadcast = (message, currentClient, username) => {
  for (const client of clients.values()) {
    if (client !== currentClient) {
      client.write(`[${username}]: ${message}\n`);
    }
  }
};
const server = net.createServer((socket) => {
  console.log("new client connected");
  let username;
  let buffer = "";
  socket.on("data", (data) => {
    buffer += data.toString();

    while (buffer.includes("\n")) {
      const idx = buffer.indexOf("\n");
      const message = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      const usernameInput = message.trim();
      if (!username) {
        if (usernameInput === "") {
          socket.write("Username cannot be empty. Try again\n");
        } else {
          if (clients.has(usernameInput))
            socket.write(`Username ${usernameInput} is already taken\n`);
          else {
            clients.set(usernameInput, socket);
            username = usernameInput;
            socket.write(`Username accepted. You are ${username}\n`);
          }
        }
      } else {
        if (message.startsWith("/msg")) {
          const parts = message.split(" ");
          const messageText = parts.slice(2).join(" ");

          const targetUsername = parts[1];
          if (!targetUsername || !messageText) {
            socket.write("Usage: /msg <username> <message>\n");
          } else {
            const targetSocket = clients.get(targetUsername);

            if (targetSocket) {
              socket.write(`[you -> ${targetUsername}]: ${messageText}\n`);
              targetSocket.write(`[DM from ${username}]: ${messageText}\n`);
            } else {
              socket.write(`User ${targetUsername} is not found`);
            }
          }
        } else if (message === "/who") {
          socket.write("Connected users:\n");
          for (const client of clients.keys()) {
            socket.write(`${client}\n`);
          }
        } else if (message === "/quit") {
          clients.delete(username);
          socket.write(`Goodbye!\n`);
          socket.end();
        } else {
          broadcast(message, socket, username);
        }
      }
    }
  });

  socket.on("close", () => {
    console.log("client disconnected");
    clients.delete(username);
  });

  socket.on("error", () => {});
});

const PORT = process.env.PORT;

server.listen(PORT, "127.0.0.1", () => {
  console.log(`server is running on port ${PORT} `);
});
