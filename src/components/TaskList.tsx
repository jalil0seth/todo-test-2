import React from 'react';
import { Task, TimeFrame } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  timeFrame: TimeFrame;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, timeFrame, onUpdateTask, onDeleteTask }: TaskListProps) {
  const filteredTasks = tasks.filter(task => task.timeFrame === timeFrame);
  
  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 py-8">No tasks for {timeFrame}</p>
      )}
    </div>
  );
}