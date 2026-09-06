export type Task = {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  progress: number;
};

export enum Priority {
  LOW = "Низкий",
  MEDIUM = "Средний",
  HIGH = "Высокий",
}

export enum Status {
  TODO = "Сделать",
  PROGRESS = "В процессе",
  DONE = "Сделано",
}
