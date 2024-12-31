import React from 'react';
import { Task } from '../../types/task';
import { TaskItem } from '../TaskItem';
import { TaskEditor } from '../TaskEditor';

interface TaskItemWrapperProps {
  task: Task;
  editingTask: Task | null;
  provided: any;
  onEdit: (task: Task | null) => void;
  onUpdate: (task: Task) => void;
}

export function TaskItemWrapper({
  task,
  editingTask,
  provided,
  onEdit,
  onUpdate
}: TaskItemWrapperProps) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {editingTask?.id === task.id ? (
        <div className="p-5 bg-white rounded-lg shadow-sm">
          <TaskEditor
            task={editingTask}
            onSave={(updatedTask) => {
              onUpdate(updatedTask);
              onEdit(null);
            }}
            onCancel={() => onEdit(null)}
          />
        </div>
      ) : (
        <TaskItem
          task={task}
          onClick={() => onEdit(task)}
          onToggleComplete={() => onUpdate({ ...task, completed: !task.completed })}
        />
      )}
    </div>
  );
}