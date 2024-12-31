import React from 'react';
import { Task } from '../types/task';
import { 
  CheckCircle, 
  Circle, 
  MessageSquare, 
  ListChecks, 
  Calendar, 
  GripVertical,
  AlertOctagon,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { calculateSubtaskProgress } from '../utils/taskUtils';

const priorityIcons = {
  high: <AlertOctagon size={14} />,
  medium: <AlertTriangle size={14} />,
  low: <AlertCircle size={14} />
};

interface TaskItemProps {
  task: Task;
  onClick: () => void;
  onToggleComplete: () => void;
}

export function TaskItem({ task, onClick, onToggleComplete }: TaskItemProps) {
  const subtasks = task.subtasks ?? [];
  const completedSubtasks = subtasks.filter(st => st.completed).length;

  return (
    <div
      onClick={onClick}
      className="group task-item p-4 bg-white border border-gray-100 rounded-lg cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2">
          <GripVertical className="text-gray-400 opacity-0 group-hover:opacity-100 cursor-grab" size={20} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
            className="transition-transform hover:scale-110"
          >
            {task.completed ? (
              <CheckCircle size={20} className="text-[#ff6600]" />
            ) : (
              <Circle size={20} className="text-gray-400 group-hover:text-[#ff6600]" />
            )}
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={clsx(
            'text-base font-medium leading-snug mb-2',
            task.completed && 'line-through text-gray-500'
          )}>
            {task.title}
          </h3>
          <div className="flex flex-wrap gap-3 items-center text-sm">
            <span className={`priority-${task.priority}`}>
              {priorityIcons[task.priority]} {task.priority}
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <Calendar size={16} className="text-[#ff6600]" />
              {task.timeFrame}
            </span>
            {(task.comments?.length ?? 0) > 0 && (
              <span className="flex items-center gap-1.5 text-gray-600">
                <MessageSquare size={16} className="text-[#ff6600]" />
                {task.comments?.length}
              </span>
            )}
            {subtasks.length > 0 && (
              <span className="flex items-center gap-1.5 text-gray-600">
                <ListChecks size={16} className="text-[#ff6600]" />
                {completedSubtasks}/{subtasks.length}
              </span>
            )}
            {task.tags?.map(tag => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}