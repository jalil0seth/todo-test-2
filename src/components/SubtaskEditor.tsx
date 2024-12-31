import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SubtaskEditorProps {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

export function SubtaskEditor({ onAdd, onCancel }: SubtaskEditorProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter subtask title..."
        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Plus size={18} />
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
      >
        <X size={18} />
      </button>
    </form>
  );
}