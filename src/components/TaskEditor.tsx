import React, { useState } from 'react';
import { Task, Priority, TimeFrame } from '../types/task';
import { Save, X, Eye, EyeOff, Plus } from 'lucide-react';
import { MarkdownPreview } from './MarkdownPreview';
import { PrioritySelect } from './PrioritySelect';
import { TimeFrameSelect } from './TimeFrameSelect';
import { TagInput } from './TagInput';
import { SubtaskList } from './SubtaskList';
import { Comments } from './Comments';
import { TabView } from './TabView';
import { ListChecks, MessageSquare, FileText } from 'lucide-react';

interface TaskEditorProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
}

export function TaskEditor({ task, onSave, onCancel }: TaskEditorProps) {
  const [editedTask, setEditedTask] = useState(task);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(editedTask);
  };

  const handleAddSubtask = (title: string) => {
    setEditedTask({
      ...editedTask,
      subtasks: [...(editedTask.subtasks || []), { id: crypto.randomUUID(), title, completed: false }]
    });
  };

  const handleToggleSubtask = (subtaskId: string) => {
    setEditedTask({
      ...editedTask,
      subtasks: (editedTask.subtasks || []).map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      )
    });
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    setEditedTask({
      ...editedTask,
      subtasks: (editedTask.subtasks || []).filter(st => st.id !== subtaskId)
    });
  };

  const handleAddComment = (content: string) => {
    setEditedTask({
      ...editedTask,
      comments: [...(editedTask.comments || []), { id: crypto.randomUUID(), content, createdAt: new Date() }]
    });
  };

  const handleUpdateTags = (tags: string[]) => {
    setEditedTask({ ...editedTask, tags });
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: <FileText size={18} /> },
    { id: 'subtasks', label: 'Subtasks', icon: <ListChecks size={18} /> },
    { id: 'comments', label: 'Comments', icon: <MessageSquare size={18} /> },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Task title"
          required
        />
      </div>

      <TagInput tags={editedTask.tags || []} onChange={handleUpdateTags} />

      <div className="grid grid-cols-2 gap-4">
        <PrioritySelect
          value={editedTask.priority}
          onChange={(priority) => setEditedTask({ ...editedTask, priority })}
        />
        <TimeFrameSelect
          value={editedTask.timeFrame}
          onChange={(timeFrame) => setEditedTask({ ...editedTask, timeFrame })}
        />
      </div>

      <TabView tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'details' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description (Markdown supported)
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                {showPreview ? (
                  <>
                    <EyeOff size={16} /> Hide Preview
                  </>
                ) : (
                  <>
                    <Eye size={16} /> Show Preview
                  </>
                )}
              </button>
            </div>
            
            {showPreview ? (
              <div className="min-h-[200px] p-4 border rounded-lg bg-gray-50">
                <MarkdownPreview content={editedTask.description} />
              </div>
            ) : (
              <textarea
                id="description"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px] font-mono"
                placeholder="Task description (supports markdown)&#10;&#10;# Heading&#10;- List item&#10;- [ ] Task&#10;```code block```"
              />
            )}
          </div>
        )}
        {activeTab === 'subtasks' && (
          <SubtaskList
            subtasks={editedTask.subtasks || []}
            onAdd={handleAddSubtask}
            onToggle={handleToggleSubtask}
            onDelete={handleDeleteSubtask}
          />
        )}
        {activeTab === 'comments' && (
          <Comments
            comments={editedTask.comments || []}
            onAddComment={handleAddComment}
          />
        )}
      </TabView>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Save size={18} /> Save Changes
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <X size={18} /> Cancel
        </button>
      </div>
    </form>
  );
}