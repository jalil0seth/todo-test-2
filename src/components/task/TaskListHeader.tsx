import React from 'react';
import { SearchBar } from '../SearchBar';
import { PlusCircle } from 'lucide-react';

interface TaskListHeaderProps {
  onAddTask: () => void;
}

export function TaskListHeader({ onAddTask }: TaskListHeaderProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <SearchBar />
      <button
        onClick={onAddTask}
        className="btn btn-primary whitespace-nowrap"
      >
        <PlusCircle size={18} /> Add Task
      </button>
    </div>
  );
}