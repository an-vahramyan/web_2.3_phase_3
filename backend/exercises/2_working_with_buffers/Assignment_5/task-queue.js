const EventEmitter = require("node:events");

class TaskQueue extends EventEmitter {
  #concurrency;
  #queue = [];
  #running = 0;
  #wasActive = false;

  constructor(concurrency) {
    super();

    if (!Number.isInteger(concurrency) || concurrency <= 0) {
      throw new Error("Concurrency must be a positive integer");
    }

    this.#concurrency = concurrency;
  }

  add(id, jobFn) {
    if (typeof jobFn !== "function") {
      throw new TypeError("jobFn must be a function");
    }

    this.#queue.push({
      id,
      jobFn,
    });

    this.#wasActive = true;

    this.#runNext();
  }

  #runNext() {
    while (
      this.#running < this.#concurrency &&
      this.#queue.length > 0
    ) {
      const job = this.#queue.shift();

      this.#running++;

      this.emit("job:start", {
        id: job.id,
      });

      Promise.resolve()
        .then(() => job.jobFn())
        .then((result) => {
          this.emit("job:complete", {
            id: job.id,
            result,
          });
        })
        .catch((error) => {
          this.emit("job:error", {
            id: job.id,
            error,
          });
        })
        .finally(() => {
          this.#running--;

          this.#runNext();

          this.#checkEmpty();
        });
    }

    this.#checkEmpty();
  }

  #checkEmpty() {
    if (
      this.#wasActive &&
      this.#running === 0 &&
      this.#queue.length === 0
    ) {
      this.#wasActive = false;

      this.emit("queue:empty");
    }
  }
}

module.exports = TaskQueue;