import React from 'react';
import { Search } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

export function SearchBar() {
  const { searchTasks } = useTaskContext();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        onChange={(e) => searchTasks(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}