import { Task, Priority } from '../types/task';

const PRIORITY_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1
};

export const calculateTaskRank = (task: Task): number => {
  let rank = PRIORITY_WEIGHTS[task.priority] * 1000; // Priority is the main factor
  
  // Subtract points for completed tasks
  if (task.completed) {
    rank -= 500;
  }

  // Add points based on urgency
  switch (task.timeFrame) {
    case 'today':
      rank += 300;
      break;
    case 'tomorrow':
      rank += 200;
      break;
    case 'future':
      rank += 100;
      break;
    default:
      break;
  }

  // Add points for having subtasks
  if (task.subtasks?.length > 0) {
    rank += 50;
  }

  return rank;
};