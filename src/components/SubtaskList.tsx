import React, { useState } from 'react';
import { Subtask } from '../types/task';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { SubtaskProgress } from './SubtaskProgress';
import { SubtaskEditor } from './SubtaskEditor';
import { clsx } from 'clsx';

interface SubtaskListProps {
  subtasks: Subtask[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SubtaskList({ subtasks = [], onAdd, onToggle, onDelete }: SubtaskListProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-4" onClick={handleClick}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Subtasks</h3>
        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus size={16} /> Add Subtask
          </button>
        )}
      </div>

      {subtasks.length > 0 && <SubtaskProgress subtasks={subtasks} />}

      {isAdding && (
        <SubtaskEditor
          onAdd={(title) => {
            onAdd(title);
            setIsAdding(false);
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}

      <div className="space-y-2">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
          >
            <button
              type="button"
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
              type="button"
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