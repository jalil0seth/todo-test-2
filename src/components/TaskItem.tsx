import React from 'react';
import { Task } from '../types/task';
import { CheckCircle, Circle, MessageSquare, ListChecks } from 'lucide-react';
import { clsx } from 'clsx';
import { priorityColors, calculateSubtaskProgress } from '../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onClick: () => void;
  onToggleComplete: () => void;
}

export function TaskItem({ task, onClick, onToggleComplete }: TaskItemProps) {
  // Ensure subtasks is defined with a default empty array
  const subtasks = task.subtasks ?? [];
  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const subtaskProgress = calculateSubtaskProgress(subtasks);

  return (
    <div
      onClick={onClick}
      className={clsx(
        'p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer',
        task.completed && 'opacity-75'
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className="mt-1"
        >
          {task.completed ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Circle className="text-gray-400" />
          )}
        </button>
        <div className="flex-1">
          <h3 className={clsx(
            'text-lg font-medium',
            task.completed && 'line-through text-gray-500'
          )}>
            {task.title}
          </h3>
          <div className="mt-2 flex gap-2 items-center">
            <span className={clsx(
              'px-2 py-1 rounded-full text-xs font-medium',
              priorityColors[task.priority]
            )}>
              {task.priority}
            </span>
            {(task.comments?.length ?? 0) > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <MessageSquare size={14} />
                {task.comments?.length}
              </span>
            )}
            {subtasks.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <ListChecks size={14} />
                {completedSubtasks}/{subtasks.length} ({subtaskProgress}%)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}