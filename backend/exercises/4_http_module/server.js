const { createServer } = require("node:http");
const port = process.env.PORT || 4000;
const hostname = "127.0.0.1";

const notes = [
  { id: 1, title: "Node" },
  { id: 2, title: "HTTP" },
  { id: 3, title: "URL" },
];
const tasks = [
  { id: 1, title: "Learn Node.js" },
  { id: 2, title: "Build an HTTP server" },
  { id: 3, title: "Practice REST API requests" },
];
const server = createServer((req, res) => {
  const parsedURL = new URL(req.url, `http://${req.headers.host}`);
  const parts = parsedURL.pathname.split("/");

  if (parts[1] === "notes") {
    if (parts.length === 2) {
      if (req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(notes));
      } else if (req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          try {
            const noteBody = JSON.parse(body);
            const id = Math.max(0, ...notes.map((note) => note.id)) + 1;
            const newNote = { id: id, ...noteBody };
            notes.push(newNote);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                message: "note successfully created",
                data: newNote,
              }),
            );
          } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "invalid JSON" }));
          }
        });
      }
    } else if (parts.length === 3) {
      if (req.method === "GET") {
        const id = Number(parts[2]);

        if (!Number.isInteger(id)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "invalid id" }));
          return;
        }
        const note = notes.find((n) => n.id === id);
        if (note) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(note));
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "note doesn't exist" }));
        }
      } else if (req.method === "PUT") {
        const id = Number(parts[2]);
        if (!Number.isInteger(id)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "invalid id" }));
          return;
        }
        const noteIndex = notes.findIndex((n) => n.id === id);
        if (noteIndex === -1) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "note doesn't exist" }));
        } else {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const noteBody = JSON.parse(body);
              const newNote = { id: id, ...noteBody };
              notes[noteIndex] = newNote;

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  message: "Note updated",
                  data: newNote,
                }),
              );
            } catch (error) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
          });
        }
      } else if (req.method === "DELETE") {
        const id = Number(parts[2]);
        if (!Number.isInteger(id)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "invalid id" }));
          return;
        }
        const noteIndex = notes.findIndex((n) => n.id === id);
        if (noteIndex === -1) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "note doesn't exist" }));
        } else {
          notes.splice(noteIndex, 1);

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              message: "Note deleted",
              data: notes,
            }),
          );
        }
      }
    }
  } else if (parts[1] === "tasks") {
    if (parts.length === 2) {
      if (req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(tasks));
      } else if (req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          try {
            const taskBody = JSON.parse(body);
            const id = Math.max(0, ...tasks.map((task) => task.id)) + 1;
            const newTask = { id: id, ...taskBody };
            tasks.push(newTask);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                message: "task created successfully",
                data: newTask,
              }),
            );
          } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid  JSON" }));
          }
        });
      }
    } else if (parts.length === 3) {
      if (req.method === "GET") {
        const id = Number(parts[2]);
        if (!Number.isInteger(id)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "invalid id" }));
          return;
        }
        const task = tasks.find((t) => t.id === id);
        if (task) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(task));
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "task doesn't exist" }));
        }
      } else if (req.method === "PUT") {
        const id = Number(parts[2]);
        if (!Number.isInteger(id)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "invalid id" }));
          return;
        }
        const taskIndex = tasks.findIndex((t) => t.id === id);
        if (taskIndex === -1) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "task doesn't exist" }));
        } else {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const taskBody = JSON.parse(body);
              const newTask = { id: id, ...taskBody };
              tasks[taskIndex] = newTask;

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  message: "task updated",
                  data: newTask,
                }),
              );
            } catch (error) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
          });
        }
      } else if (req.method === "DELETE") {
        const id = Number(parts[2]);
        if (!Number.isInteger(id)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: "invalid id" }));
          return;
        }
        const taskIndex = tasks.findIndex((t) => t.id === id);
        if (taskIndex === -1) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "task doesn't exist" }));
        } else {
          tasks.splice(taskIndex, 1);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              message: "task deleted",
              data: tasks,
            }),
          );
        }
      }
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is runing at http://${hostname}:${port}/`);
});
