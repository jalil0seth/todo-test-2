import React from 'react';
import { Search } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

export function SearchBar() {
  const { searchTasks } = useTaskContext();

  return (
    <div className="relative flex-1 max-w-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        onChange={(e) => searchTasks(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#ff6600]/20 focus:border-[#ff6600]"
      />
    </div>
  );
}