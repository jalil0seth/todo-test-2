import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Calendar, CalendarCheck, CalendarClock, Hash, Archive } from 'lucide-react';

export function TaskStats() {
  const { tasks, filterByTimeFrame, filterByStatus, searchTasks } = useTaskContext();

  const stats = {
    today: tasks.filter(t => t.timeFrame === 'today' && t.status === 'active').length,
    tomorrow: tasks.filter(t => t.timeFrame === 'tomorrow' && t.status === 'active').length,
    future: tasks.filter(t => t.timeFrame === 'future' && t.status === 'active').length,
    archived: tasks.filter(t => t.status === 'archived').length
  };

  const allTags = [...new Set(tasks.flatMap(t => t.tags || []))];
  const tagStats = allTags.reduce((acc, tag) => {
    acc[tag] = tasks.filter(t => t.tags?.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Task Overview</h2>
        <div className="space-y-2">
          <button
            onClick={() => {
              filterByStatus('active');
              filterByTimeFrame('today');
            }}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <CalendarCheck className="text-blue-500" />
              <span>Today</span>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              {stats.today}
            </span>
          </button>
          <button
            onClick={() => {
              filterByStatus('active');
              filterByTimeFrame('tomorrow');
            }}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Calendar className="text-yellow-500" />
              <span>Tomorrow</span>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
              {stats.tomorrow}
            </span>
          </button>
          <button
            onClick={() => {
              filterByStatus('active');
              filterByTimeFrame('future');
            }}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <CalendarClock className="text-purple-500" />
              <span>Future</span>
            </div>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
              {stats.future}
            </span>
          </button>
          <button
            onClick={() => filterByStatus('archived')}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Archive className="text-gray-500" />
              <span>Archived</span>
            </div>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
              {stats.archived}
            </span>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Tags</h2>
        <div className="space-y-2">
          {Object.entries(tagStats).map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => searchTasks(tag)}
              className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Hash className="text-gray-500" size={18} />
                <span>{tag}</span>
              </div>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}