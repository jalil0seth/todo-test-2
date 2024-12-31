import React, { useState, useCallback } from 'react';
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

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleUpdate = useCallback((updatedTask: Task) => {
    onUpdate(updatedTask);
  }, [onUpdate]);

  const handleSave = useCallback((updatedTask: Task) => {
    handleUpdate(updatedTask);
    setIsEditing(false);
  }, [handleUpdate]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Task" : undefined}
      onEdit={!isEditing ? handleEdit : undefined}
      isEditing={isEditing}
    >
      {isEditing ? (
        <TaskEditor
          task={task}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <TaskModalContent
          task={task}
          onUpdate={handleUpdate}
          onArchive={onArchive}
          onClose={onClose}
          onEdit={handleEdit}
        />
      )}
    </Modal>
  );
}