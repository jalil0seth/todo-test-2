import { Task, Priority } from '../types/task';

export const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-50 text-orange-800',
  high: 'bg-red-50 text-red-800'
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