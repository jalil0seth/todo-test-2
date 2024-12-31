import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { TaskModal } from './TaskModal';
import { SearchBar } from './SearchBar';
import { PlusCircle } from 'lucide-react';
import { createEmptyTask } from '../utils/taskUtils';
import { TaskEditor } from './TaskEditor';
import { Task } from '../types/task';

export function TaskList() {
  const { filteredTasks, addTask, updateTask, deleteTask } = useTaskContext();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <PlusCircle size={20} /> Add Task
        </button>
      </div>

      <SearchBar />

      {isAddingTask && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <TaskEditor
            task={{ ...createEmptyTask(), id: '', createdAt: new Date() }}
            onSave={(task) => {
              addTask(task);
              setIsAddingTask(false);
            }}
            onCancel={() => setIsAddingTask(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <React.Fragment key={task.id}>
            {editingTask?.id === task.id ? (
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                <TaskEditor
                  task={editingTask}
                  onSave={(updatedTask) => {
                    updateTask(updatedTask);
                    setEditingTask(null);
                  }}
                  onCancel={() => setEditingTask(null)}
                />
              </div>
            ) : (
              <TaskItem
                task={task}
                onClick={() => setEditingTask(task)}
                onToggleComplete={() => updateTask({ ...task, completed: !task.completed })}
              />
            )}
          </React.Fragment>
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}