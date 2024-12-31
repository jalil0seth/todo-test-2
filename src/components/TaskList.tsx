import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/task';
import { createEmptyTask } from '../utils/taskUtils';
import { DraggableTaskList } from './task/DraggableTaskList';
import { TaskListHeader } from './task/TaskListHeader';
import { TaskEditor } from './TaskEditor';

export function TaskList() {
  const { filteredTasks, addTask, updateTask, reorderTasks, filterByTimeFrame } = useTaskContext();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Set default filter to 'today' on component mount
  useEffect(() => {
    filterByTimeFrame('today');
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

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
            showPreview={true}
          />
        </div>
      )}

      <DraggableTaskList
        tasks={filteredTasks}
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