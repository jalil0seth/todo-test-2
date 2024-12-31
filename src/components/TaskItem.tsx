import React from 'react';
import { Task } from '../types/task';
import { CheckCircle, Circle, MessageSquare, ListChecks, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { priorityColors, calculateSubtaskProgress } from '../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onClick: () => void;
  onToggleComplete: () => void;
}

export function TaskItem({ task, onClick, onToggleComplete }: TaskItemProps) {
  const subtasks = task.subtasks ?? [];
  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const subtaskProgress = calculateSubtaskProgress(subtasks);

  return (
    <div
      onClick={onClick}
      className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
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
            <CheckCircle size={20} className="text-[#ff6600]" />
          ) : (
            <Circle size={20} className="text-gray-400 group-hover:text-[#ff6600]" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h3 className={clsx(
            'text-base font-medium leading-snug mb-2',
            task.completed && 'line-through text-gray-500'
          )}>
            {task.title}
          </h3>
          <div className="flex flex-wrap gap-3 items-center text-sm text-gray-600">
            <span className={clsx(
              'px-2 py-1 rounded-md font-medium',
              priorityColors[task.priority]
            )}>
              {task.priority}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-gray-400" />
              {task.timeFrame}
            </span>
            {(task.comments?.length ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare size={16} className="text-gray-400" />
                {task.comments?.length}
              </span>
            )}
            {subtasks.length > 0 && (
              <span className="flex items-center gap-1">
                <ListChecks size={16} className="text-gray-400" />
                {completedSubtasks}/{subtasks.length}
              </span>
            )}
            {task.tags?.map(tag => (
              <span key={tag} className="text-[#ff6600]">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}