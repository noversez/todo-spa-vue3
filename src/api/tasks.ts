export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [{ id: 1, title: 'Раз', completed: false }];
let nextId = 2;

const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

export const api = {
  async fetchAll(): Promise<Task[]> {
    await wait(300);
    return [...tasks];
  },
  async create(title: string): Promise<Task> {
    await wait(200);
    const newTask = { id: nextId++, title, completed: false };
    tasks.push(newTask);
    return newTask;
  },
  async remove(id: number): Promise<void> {
    await wait(150);
    tasks = tasks.filter((t) => t.id !== id);
  },
  async update(updated: Task): Promise<Task> {
    await wait(150);
    tasks = tasks.map((t) => (t.id === updated.id ? updated : t));
    return updated;
  },
};
