import { Task } from '../types/task';

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2
};

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff === 0) {
      // If priorities are equal, sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return priorityDiff;
  });
};