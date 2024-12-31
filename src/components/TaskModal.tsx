import React, { useState } from 'react';
import { Task } from '../types/task';
import { Modal } from './Modal';
import { Comments } from './Comments';
import { SubtaskList } from './SubtaskList';
import { TaskEditor } from './TaskEditor';
import { TagInput } from './TagInput';
import { TabView } from './TabView';
import { format } from 'date-fns';
import { CheckCircle, Circle, Edit2, Archive, ListChecks, MessageSquare, Hash, FileText } from 'lucide-react';
import { clsx } from 'clsx';
import { priorityColors } from '../utils/taskUtils';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onArchive: (taskId: string) => void;
}

export function TaskModal({ task, isOpen, onClose, onUpdate, onArchive }: TaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  if (!task) return null;

  const handleAddSubtask = (title: string) => {
    onUpdate({
      ...task,
      subtasks: [...(task.subtasks || []), { id: crypto.randomUUID(), title, completed: false }]
    });
  };

  const handleToggleSubtask = (subtaskId: string) => {
    onUpdate({
      ...task,
      subtasks: (task.subtasks || []).map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      )
    });
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    onUpdate({
      ...task,
      subtasks: (task.subtasks || []).filter(st => st.id !== subtaskId)
    });
  };

  const handleAddComment = (content: string) => {
    onUpdate({
      ...task,
      comments: [...(task.comments || []), { id: crypto.randomUUID(), content, createdAt: new Date() }]
    });
  };

  const handleUpdateTags = (tags: string[]) => {
    onUpdate({
      ...task,
      tags
    });
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: <FileText size={18} /> },
    { id: 'subtasks', label: 'Subtasks', icon: <ListChecks size={18} /> },
    { id: 'comments', label: 'Comments', icon: <MessageSquare size={18} /> },
  ];

  if (isEditing) {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsEditing(false)}>
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <div className="flex gap-2 mt-2">
              <span className={clsx(
                'px-2 py-1 rounded-full text-xs font-medium',
                priorityColors[task.priority]
              )}>
                {task.priority}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
                {task.timeFrame}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
                Created {format(new Date(task.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
            >
              <Edit2 size={16} /> Edit
            </button>
            <button
              onClick={() => onArchive(task.id)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Archive size={16} /> Archive
            </button>
            <button
              onClick={() => onUpdate({ ...task, completed: !task.completed })}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
            >
              {task.completed ? (
                <CheckCircle className="text-green-500" size={16} />
              ) : (
                <Circle className="text-gray-400" size={16} />
              )}
              {task.completed ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>

        <TagInput tags={task.tags || []} onChange={handleUpdateTags} />

        <TabView tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === 'details' && (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{task.description}</ReactMarkdown>
            </div>
          )}
          {activeTab === 'subtasks' && (
            <SubtaskList
              subtasks={task.subtasks || []}
              onAdd={handleAddSubtask}
              onToggle={handleToggleSubtask}
              onDelete={handleDeleteSubtask}
            />
          )}
          {activeTab === 'comments' && (
            <Comments
              comments={task.comments || []}
              onAddComment={handleAddComment}
            />
          )}
        </TabView>
      </div>
    </Modal>
  );
}