import React, { useState } from 'react';
import { Task } from '../types/task';
import { Modal } from './Modal';
import { TaskModalContent } from './task/TaskModalContent';
import { TaskEditor } from './TaskEditor';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onArchive: (taskId: string) => void;
}

export function TaskModal({ task, isOpen, onClose, onUpdate, onArchive }: TaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!task) return null;

  if (isEditing) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsEditing(false)}
        title="Edit Task"
      >
        <TaskEditor
          task={task}
          onSave={(updatedTask) => {
            onUpdate(updatedTask);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <TaskModalContent
        task={task}
        onUpdate={onUpdate}
        onArchive={onArchive}
        onClose={onClose}
      />
    </Modal>
  );
}