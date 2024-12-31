import React from 'react';
import { Task } from '../../types/task';
import { TabView } from '../TabView';
import { TaskDetails } from './TaskDetails';
import { SubtaskList } from './SubtaskList';
import { Comments } from '../Comments';
import { TagInput } from '../TagInput';
import { TaskActions } from './TaskActions';
import { ListChecks, MessageSquare, FileText } from 'lucide-react';

interface TaskModalContentProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onArchive: (taskId: string) => void;
  onClose: () => void;
  onEdit: () => void;
}

export function TaskModalContent({ task, onUpdate, onArchive, onClose, onEdit }: TaskModalContentProps) {
  const [activeTab, setActiveTab] = React.useState('details');

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

  const handleUpdateSubtask = (subtaskId: string, title: string) => {
    onUpdate({
      ...task,
      subtasks: (task.subtasks || []).map(st =>
        st.id === subtaskId ? { ...st, title } : st
      )
    });
  };

  const handleAddComment = (content: string) => {
    onUpdate({
      ...task,
      comments: [...(task.comments || []), { id: crypto.randomUUID(), content, createdAt: new Date() }]
    });
  };

  const handleUpdateTags = (tags: string[]) => {
    onUpdate({ ...task, tags });
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: <FileText size={18} /> },
    { id: 'subtasks', label: 'Subtasks', icon: <ListChecks size={18} /> },
    { id: 'comments', label: 'Comments', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <TaskActions
        task={task}
        onUpdate={onUpdate}
        onArchive={onArchive}
      />
      
      <TagInput tags={task.tags || []} onChange={handleUpdateTags} />

      <TabView tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'details' && <TaskDetails task={task} />}
        {activeTab === 'subtasks' && (
          <SubtaskList
            subtasks={task.subtasks || []}
            onAdd={handleAddSubtask}
            onToggle={handleToggleSubtask}
            onDelete={handleDeleteSubtask}
            onUpdate={handleUpdateSubtask}
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
  );
}