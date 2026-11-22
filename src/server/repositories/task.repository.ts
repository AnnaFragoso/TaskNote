// Access task data an in memory repository, making data storage operation isolated
import "server-only";

export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

const tasks: Task[] = [];

export const taskRepository = {
  findAll(): Task[] {
    return tasks.map((task) => ({ ...task })).reverse();
  },

  create(data: Pick<Task, "title" | "description">): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      createdAt: new Date().toISOString(),
    };

    tasks.push(task);

    return { ...task };
  },

  update(
    id: string,
    data: Pick<Task, "title" | "description">
  ): Task | null {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return null;
    }

    tasks[index] = {
      ...tasks[index],
      ...data,
    };

    return { ...tasks[index] };
  },

  delete(id: string): boolean {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    tasks.splice(index, 1);

    return true;
  },
};
