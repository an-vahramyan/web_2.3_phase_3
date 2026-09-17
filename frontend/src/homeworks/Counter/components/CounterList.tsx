import type { Counter } from "../helpers/types.ts";

type CounterListProps = {
  counters: Counter[];
};

function CounterList({ counters }: CounterListProps) {
  return (
    <table className="counter-history-table">
      <thead>
        <tr>
          <th>CounterId</th>
          <th>StartTime</th>
          <th>EndTime</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {counters.map((counter) => (
          <tr key={counter.counterId}>
            <td>{counter.counterId}</td>
            <td>{counter.startTime.toLocaleTimeString()}</td>
            <td>{counter.endTime?.toLocaleTimeString()}</td>
            <td>{counter.completed === true ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CounterList;
