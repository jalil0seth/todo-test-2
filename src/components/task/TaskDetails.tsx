import React from 'react';
import { Task } from '../../types/task';
import ReactMarkdown from 'react-markdown';

interface TaskDetailsProps {
  task: Task;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>{task.description || '*No description provided*'}</ReactMarkdown>
    </div>
  );
}