import { Task, Priority } from '../types/task';

// Significantly increase priority weights to make them dominate the ranking
const PRIORITY_WEIGHTS = {
  high: 10000,    // Much higher weight for high priority
  medium: 5000,   // Medium priority gets middle weight
  low: 1000       // Low priority gets lowest weight
};

const TIME_FRAME_WEIGHTS = {
  today: 300,
  tomorrow: 200,
  future: 100,
  archived: 0
};

export const calculateTaskRank = (task: Task): number => {
  let rank = PRIORITY_WEIGHTS[task.priority]; // Priority is now the dominant factor
  
  // Add time frame weight
  rank += TIME_FRAME_WEIGHTS[task.timeFrame];
  
  // Subtract points for completed tasks
  if (task.completed) {
    rank -= 500;
  }

  // Small bonus for having subtasks
  if (task.subtasks?.length > 0) {
    rank += 50;
  }

  // Small bonus for having comments
  if (task.comments?.length > 0) {
    rank += 25;
  }

  return rank;
};