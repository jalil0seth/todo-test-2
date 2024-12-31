import React from 'react';
import { Subtask } from '../types/task';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { clsx } from 'clsx';

interface SubtaskListProps {
  subtasks: Subtask[];
  onAdd: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SubtaskList({ subtasks, onAdd, onToggle, onDelete }: SubtaskListProps) {
  const completedCount = subtasks.filter(st => st.completed).length;
  const progress = subtasks.length > 0 ? (completedCount / subtasks.length) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Subtasks</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} /> Add Subtask
        </button>
      </div>

      {subtasks.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {completedCount}/{subtasks.length}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
          >
            <button
              onClick={() => onToggle(subtask.id)}
              className={clsx(
                'transition-colors',
                subtask.completed ? 'text-green-500' : 'text-gray-400'
              )}
            >
              {subtask.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
            </button>
            <span className={clsx('flex-1', subtask.completed && 'line-through text-gray-500')}>
              {subtask.title}
            </span>
            <button
              onClick={() => onDelete(subtask.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}