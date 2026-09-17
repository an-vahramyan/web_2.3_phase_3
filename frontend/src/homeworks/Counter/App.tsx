import { useState } from "react";
import type { Counter } from "./helpers/types.ts";
import CounterComponent from "./components/Counter.tsx";
import CounterList from "./components/CounterList.tsx";

import "./App.css";
function App() {
  const [counters, setCounters] = useState<Counter[]>([]);
  const handleCreate = () => {
    const newCounter: Counter = {
      counterId: crypto.randomUUID(),
      startTime: new Date(),
      endTime: null,
      completed: false,
      paused: false,
      countdown: 600,
    };
    setCounters([...counters, newCounter]);
  };
  const handleTick = (counterId: Counter["counterId"]) => {
    // const counter = counters.find((counter) => counter.counterId === counterId);
    setCounters((prevCounters) =>
      prevCounters.map((counter) => {
        if (counter.counterId === counterId) {
          if (counter.countdown === 1) {
            return {
              ...counter,
              countdown: 0,
              completed: true,
              endTime: new Date(),
            };
          } else if (counter.countdown > 1) {
            return {
              ...counter,
              countdown: counter.countdown - 1,
            };
          }
        }
        return counter;
      }),
    );
  };
  const handlePausePlay = (
    counterId: Counter["counterId"],
    paused: boolean,
  ) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) => {
        if (counter.counterId === counterId) {
          return { ...counter, paused };
        } else {
          return counter;
        }
      }),
    );
  };
  const handleReset = (counterId: Counter["counterId"]) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) => {
        if (counter.counterId === counterId) {
          return {
            ...counter,
            countdown: 600,
            paused: false,
            completed: false,
            endTime: null,
          };
        } else {
          return counter;
        }
      }),
    );
  };
  const handleDelete = (counterId: Counter["counterId"]) => {
    setCounters((prevCounters) =>
      prevCounters.filter((counter) => {
        return counter.counterId !== counterId;
      }),
    );
  };
  return (
    <div className="counter-app">
      <main className="counter-panel">
        <div className="counter-heading">
          <div>
            <p className="counter-eyebrow">Focus desk</p>
            <h1>Counter</h1>
          </div>
          <button className="create-button" onClick={handleCreate}>
            <span aria-hidden="true">+</span>
            Create timer
          </button>
        </div>

        <div className="counter-list">
          {counters.map((counter) => {
            return (
              <CounterComponent
                key={counter.counterId}
                counter={counter}
                onTick={handleTick}
                onPausePlay={handlePausePlay}
                onReset={handleReset}
                onDelete={handleDelete}
              />
            );
          })}
          <CounterList counters={counters} />
        </div>
      </main>
      {/* <p>{counters.length}</p> */}
    </div>
  );
}
export default App;
