import React, { useState } from 'react';
import { Subtask } from '../../types/task';
import { Plus } from 'lucide-react';
import { SubtaskProgress } from './SubtaskProgress';
import { SubtaskEditor } from './SubtaskEditor';
import { SubtaskItem } from './SubtaskItem';

interface SubtaskListProps {
  subtasks: Subtask[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export function SubtaskList({ subtasks = [], onAdd, onToggle, onDelete, onUpdate }: SubtaskListProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-4" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Subtasks</h3>
        {!isAdding && (
          <button
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
          <SubtaskItem
            key={subtask.id}
            subtask={subtask}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}