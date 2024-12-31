import { Task, Priority } from '../types/task';

export const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
} as const;

export const calculateSubtaskProgress = (subtasks: Task['subtasks'] = []) => {
  if (!subtasks?.length) return 0;
  const completedSubtasks = subtasks.filter(st => st.completed).length;
  return Math.round((completedSubtasks / subtasks.length) * 100);
};

export const createEmptyTask = (): Omit<Task, 'id' | 'createdAt'> => ({
  title: '',
  description: '',
  priority: 'medium' as Priority,
  timeFrame: 'today',
  completed: false,
  comments: [],
  subtasks: [],
  tags: []
});