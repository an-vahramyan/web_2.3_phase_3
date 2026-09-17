export type Counter = {
  counterId: number | string;
  startTime: Date;
  endTime: Date | null;
  completed: boolean;
  paused: boolean;
  countdown: number;
};
