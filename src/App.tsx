import React, { useState, useMemo } from 'react';
import { Task, TimeFrame } from './types/task';
import { TaskItem } from './components/TaskItem';
import { TaskEditor } from './components/TaskEditor';
import { TaskModal } from './components/TaskModal';
import { SearchBar } from './components/SearchBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createEmptyTask } from './utils/taskUtils';
import {
  PlusCircle,
  Calendar,
  CalendarCheck,
  CalendarClock,
  Archive
} from 'lucide-react';
import { clsx } from 'clsx';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('today');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      comments: [],
      subtasks: []
    };
    setTasks([...tasks, newTask]);
    setIsAddingTask(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleArchiveTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, timeFrame: 'archived' } : task
    ));
  };

  const timeFrames: { value: TimeFrame; label: string; icon: React.ReactNode }[] = [
    { value: 'today', label: 'Today', icon: <CalendarCheck className="w-5 h-5" /> },
    { value: 'tomorrow', label: 'Tomorrow', icon: <Calendar className="w-5 h-5" /> },
    { value: 'future', label: 'Future', icon: <CalendarClock className="w-5 h-5" /> },
    { value: 'archived', label: 'Archived', icon: <Archive className="w-5 h-5" /> },
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesTimeFrame = task.timeFrame === selectedTimeFrame;
      const matchesSearch = searchQuery.toLowerCase() === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTimeFrame && matchesSearch;
    });
  }, [tasks, selectedTimeFrame, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => setIsAddingTask(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <PlusCircle size={20} /> Add Task
          </button>
        </div>

        <div className="mb-6 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex gap-4">
            {timeFrames.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => setSelectedTimeFrame(value)}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
                  selectedTimeFrame === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {isAddingTask && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <TaskEditor
              task={{ ...createEmptyTask(), id: '', createdAt: new Date() }}
              onSave={handleAddTask}
              onCancel={() => setIsAddingTask(false)}
            />
          </div>
        )}

        <div className="space-y-4">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onClick={() => setSelectedTask(task)}
              onToggleComplete={() => handleUpdateTask({ ...task, completed: !task.completed })}
            />
          ))}
          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              {searchQuery
                ? 'No tasks found matching your search'
                : `No tasks for ${selectedTimeFrame}`}
            </p>
          )}
        </div>
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        onUpdate={handleUpdateTask}
        onArchive={handleArchiveTask}
      />
    </div>
  );
}

export default App;