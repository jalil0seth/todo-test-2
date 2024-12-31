export type Priority = 'low' | 'medium' | 'high';
export type TimeFrame = 'today' | 'tomorrow' | 'future' | 'archived';

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  timeFrame: TimeFrame;
  completed: boolean;
  createdAt: Date;
  comments: Comment[];
  subtasks: Subtask[];
}