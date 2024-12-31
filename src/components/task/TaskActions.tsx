import React from 'react';
import { Task } from '../../types/task';
import { Archive, CheckCircle, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { priorityColors } from '../../utils/taskUtils';

interface TaskActionsProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onArchive: (taskId: string) => void;
}

export function TaskActions({ task, onUpdate, onArchive }: TaskActionsProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <div className="flex gap-2 mt-2">
          <span className={clsx(
            'px-2 py-1 rounded-full text-xs font-medium',
            priorityColors[task.priority]
          )}>
            {task.priority}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
            {task.timeFrame}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
            Created {format(new Date(task.createdAt), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdate({ ...task, completed: !task.completed })}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
        >
          {task.completed ? (
            <CheckCircle className="text-green-500" size={16} />
          ) : (
            <Circle className="text-gray-400" size={16} />
          )}
          {task.completed ? 'Completed' : 'Mark Complete'}
        </button>
        <button
          onClick={() => onArchive(task.id)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <Archive size={16} /> Archive
        </button>
      </div>
    </div>
  );
}