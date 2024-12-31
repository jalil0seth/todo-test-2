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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar />
        <button
          onClick={() => setIsAddingTask(true)}
          className="btn btn-primary"
        >
          <PlusCircle size={18} /> Task
        </button>
      </div>

      {isAddingTask && (
        <div className="p-5 bg-white rounded-lg shadow-sm">
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

      <div className="space-y-3">
        {filteredTasks.map(task => (
          <React.Fragment key={task.id}>
            {editingTask?.id === task.id ? (
              <div className="p-5 bg-white rounded-lg shadow-sm">
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
          <p className="text-center text-sm text-gray-500 py-6">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}