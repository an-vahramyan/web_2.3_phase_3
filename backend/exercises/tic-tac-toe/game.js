const net = require("node:net");

const sockets = new Map();

const board = Array(9).fill("_");

let currentTurn = "X";

let isGameOver = false;
const server = net.createServer((socket) => {
  let buffer = "";

  if (sockets.size >= 2) {
    socket.write("server is full\n");
    socket.end();
    return;
  }
  const symbol = sockets.size === 0 ? "X" : "O";
  sockets.set(socket, symbol);
  console.log("new player connected");

  if (sockets.size === 2) {
    for (const [player, symbol] of sockets) {
      player.write(`SYMBOL|${symbol}\n`);
      player.write(`BOARD|${board.join(",")}\n`);
      player.write("TURN|X\n");
    }
  }

  socket.on("data", (data) => {
    buffer += data.toString();
    while (buffer.includes("\n")) {
      const idx = buffer.indexOf("\n");
      const message = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      const userInput = message.trim();

      const [command, value] = userInput.split("|");
      if (command !== "MOVE") {
        continue;
      }
      const symbol = sockets.get(socket);

      if (symbol !== currentTurn) {
        socket.write("REJECTED|not your turn\n");
        return;
      }
      const cell = Number(value);
      if (!Number.isInteger(cell) || cell < 0 || cell > 8) {
        socket.write("REJECTED|invalid cell\n");
        return;
      }
      if (board[cell] !== "_") {
        socket.write("REJECTED|cell is already occupied\n");
        return;
      }
      board[cell] = symbol;
      if (!checkWinner(board, symbol)) {
        currentTurn === "X" ? (currentTurn = "O") : (currentTurn = "X");
        const isFull = board.every((cell) => cell !== "_");

        if (isFull) {
          isGameOver = true;
          for (const [player, symbol] of sockets) {
            player.write("DRAW\n");
            player.end();
          }
        } else {
          for (const [player, symbol] of sockets) {
            player.write(`BOARD|${board.join(",")}\n`);
            player.write(`TURN|${currentTurn}\n`);
          }
        }
      } else {
        isGameOver = true;
        for (const [player, symbol] of sockets) {
          player.write(`WIN|${currentTurn}\n`);
          player.end();
        }
      }
    }
  });

  socket.on("close", () => {
    console.log("player leave");
    sockets.delete(socket);
    // socket.write("OPPONENT_LEFT");
    if (!isGameOver) {
      for (const [player, symbol] of sockets) {
        player.write("OPPONENT_LEFT");
      }
    }

    board.forEach((_, index) => {
      board[index] = "_";
    });
    currentTurn = "X";
    // isGameOver = false;
  });
});

function checkWinner(board, symbol) {
  //horizontal
  for (let i = 0; i < 7; i += 3) {
    if (
      board[i] === symbol &&
      board[i + 1] === symbol &&
      board[i + 2] === symbol
    ) {
      return true;
    }
  }
  //vertical
  for (let i = 0; i < 3; i++) {
    if (
      board[i] === symbol &&
      board[i + 3] === symbol &&
      board[i + 6] === symbol
    ) {
      return true;
    }
  }
  //dioganal
  if (board[0] === symbol && board[4] === symbol && board[8] === symbol) {
    return true;
  }
  if (board[2] === symbol && board[4] === symbol && board[6] === symbol) {
    return true;
  }
}

const PORT = process.env.PORT;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Ready for connections on port ${PORT}:`);
});
