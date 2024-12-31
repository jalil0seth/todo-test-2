import React, { createContext, useContext, useState } from 'react';
import { Task, TimeFrame } from '../types/task';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sortTasksByPriority } from '../utils/taskSorting';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  filterByTimeFrame: (timeFrame: TimeFrame) => void;
  searchTasks: (query: string) => void;
  filteredTasks: Task[];
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [timeFrameFilter, setTimeFrameFilter] = useState<TimeFrame | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks(prevTasks => sortTasksByPriority([...prevTasks, newTask]));
  };

  const updateTask = (task: Task) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(t => t.id === task.id ? task : t);
      return sortTasksByPriority(updatedTasks);
    });
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTasks(result);
  };

  const filterByTimeFrame = (timeFrame: TimeFrame) => {
    setTimeFrameFilter(timeFrame);
    setSearchQuery('');
  };

  const searchTasks = (query: string) => {
    setSearchQuery(query);
    setTimeFrameFilter(null);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesTimeFrame = !timeFrameFilter || task.timeFrame === timeFrameFilter;
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTimeFrame && matchesSearch;
  });

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      filterByTimeFrame,
      searchTasks,
      filteredTasks,
      reorderTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}