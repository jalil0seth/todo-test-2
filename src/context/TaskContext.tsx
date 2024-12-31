import React, { createContext, useContext, useState } from 'react';
import { Task, TimeFrame, TaskStatus } from '../types/task';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateTaskRank } from '../utils/taskRanking';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'order' | 'rank' | 'status'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  archiveTask: (id: string) => void;
  filterByTimeFrame: (timeFrame: TimeFrame) => void;
  filterByStatus: (status: TaskStatus) => void;
  searchTasks: (query: string) => void;
  filteredTasks: Task[];
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [timeFrameFilter, setTimeFrameFilter] = useState<TimeFrame | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'order' | 'rank' | 'status'>) => {
    const maxOrder = Math.max(0, ...tasks.map(t => t.order));
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      order: maxOrder + 1,
      rank: 0,
      status: 'active'
    };
    
    // Calculate initial rank
    newTask.rank = calculateTaskRank(newTask);
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (task: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(t => {
        if (t.id === task.id) {
          // Recalculate rank when task is updated
          return { ...task, rank: calculateTaskRank(task) };
        }
        return t;
      })
    );
  };

  const archiveTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === id ? { ...t, status: 'archived' as TaskStatus } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    setTasks(prevTasks => {
      const result = Array.from(prevTasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      return result.map((task, index) => ({
        ...task,
        order: index
      }));
    });
  };

  const filterByTimeFrame = (timeFrame: TimeFrame) => {
    setTimeFrameFilter(timeFrame);
    setSearchQuery('');
  };

  const filterByStatus = (status: TaskStatus) => {
    setStatusFilter(status);
  };

  const searchTasks = (query: string) => {
    setSearchQuery(query);
    setTimeFrameFilter(null);
  };

  const filteredTasks = tasks
    .filter(task => {
      const matchesTimeFrame = !timeFrameFilter || task.timeFrame === timeFrameFilter;
      const matchesStatus = task.status === statusFilter;
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTimeFrame && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      // First sort by rank
      if (a.rank !== b.rank) {
        return b.rank - a.rank;
      }
      // Then by manual order
      return a.order - b.order;
    });

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      archiveTask,
      filterByTimeFrame,
      filterByStatus,
      searchTasks,
      filteredTasks,
      reorderTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );
}