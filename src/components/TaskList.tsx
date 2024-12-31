import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/task';
import { createEmptyTask } from '../utils/taskUtils';
import { sortTasksByPriority } from '../utils/taskSorting';
import { DraggableTaskList } from './task/DraggableTaskList';
import { TaskListHeader } from './task/TaskListHeader';
import { TaskEditor } from './TaskEditor';

export function TaskList() {
  const { filteredTasks, addTask, updateTask, reorderTasks } = useTaskContext();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  const sortedTasks = sortTasksByPriority(filteredTasks);

  return (
    <div className="space-y-6">
      <TaskListHeader onAddTask={() => setIsAddingTask(true)} />

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

      <DraggableTaskList
        tasks={sortedTasks}
        onDragEnd={handleDragEnd}
        editingTask={editingTask}
        onEdit={setEditingTask}
        onUpdate={updateTask}
      />

      {filteredTasks.length === 0 && (
        <p className="text-center text-sm text-gray-500 py-6">
          No tasks found
        </p>
      )}
    </div>
  );
}