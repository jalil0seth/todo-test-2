import React, { useState } from 'react';
import { Subtask } from '../../types/task';
import { CheckCircle, Circle, Edit2, Save, Trash2, X } from 'lucide-react';
import { clsx } from 'clsx';

interface SubtaskItemProps {
  subtask: Subtask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export function SubtaskItem({ subtask, onToggle, onDelete, onUpdate }: SubtaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(subtask.title);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditingTitle(subtask.title);
  };

  const handleSave = () => {
    if (editingTitle.trim()) {
      onUpdate(subtask.id, editingTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTitle(subtask.title);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group">
      <button
        onClick={() => onToggle(subtask.id)}
        className={clsx(
          'transition-colors',
          subtask.completed ? 'text-green-500' : 'text-gray-400'
        )}
      >
        {subtask.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
      </button>
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            className="flex-1 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="p-1 text-green-600 hover:text-green-700"
          >
            <Save size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-gray-600 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <span className={clsx('flex-1', subtask.completed && 'line-through text-gray-500')}>
            {subtask.title}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <button
              onClick={handleStartEdit}
              className="p-1 text-gray-400 hover:text-blue-500"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(subtask.id)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}