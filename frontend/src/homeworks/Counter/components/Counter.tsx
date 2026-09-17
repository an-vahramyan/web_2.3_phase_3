import type { Counter as CounterType } from "../helpers/types.ts";
import { useEffect } from "react";
type CounterProps = {
  counter: CounterType;
  onTick: (counterId: CounterType["counterId"]) => void;
  // onTogglePause: (counterId: CounterType["counterId"]) => void;
  onPausePlay: (counterId: CounterType["counterId"], paused: boolean) => void;
  onReset: (counterId: CounterType["counterId"]) => void;
  onDelete: (counterId: CounterType["counterId"]) => void;
};
function Counter({
  counter,
  onTick,
  onPausePlay,
  onReset,
  onDelete,
}: CounterProps) {
  const minutes = Math.floor(counter.countdown / 60);
  const seconds = counter.countdown % 60;
  const formattedSeconds = String(seconds).padStart(2, "0");
  useEffect(() => {
    if (counter.paused === true || counter.completed === true) {
      // clearInterval(intervalId);
      return;
    }
    const intervalId = setInterval(() => {
      onTick(counter.counterId);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [counter.paused, counter.completed]);
  return (
    <div className="counter-card">
      <span className="counter-label">Session</span>
      <strong className="counter-time">
        {minutes}:{formattedSeconds}
      </strong>
      <span className="counter-status">Running</span>
      <div className="counter-controls">
        <button
          className="counter-control counter-control-pause"
          type="button"
          onClick={() => onPausePlay(counter.counterId, true)}
        >
          <span className="control-icon" aria-hidden="true">
            ||
          </span>
          Pause
        </button>
        <button
          className="counter-control counter-control-play"
          type="button"
          onClick={() => onPausePlay(counter.counterId, false)}
        >
          <span className="control-icon" aria-hidden="true">
            ▶
          </span>
          Play
        </button>
        <button
          className="counter-control counter-control-reset"
          type="button"
          onClick={() => onReset(counter.counterId)}
        >
          <span className="control-icon" aria-hidden="true">
            ↻
          </span>
          Reset
        </button>
        <button
          className="counter-control counter-control-delete"
          type="button"
          onClick={() => onDelete(counter.counterId)}
        >
          <span className="control-icon" aria-hidden="true">
            ×
          </span>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Counter;
