import React from 'react';
import { Subtask } from '../types/task';

interface SubtaskProgressProps {
  subtasks: Subtask[];
}

export function SubtaskProgress({ subtasks }: SubtaskProgressProps) {
  const completedCount = subtasks.filter(st => st.completed).length;
  const progress = subtasks.length > 0 ? (completedCount / subtasks.length) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">
          {completedCount}/{subtasks.length}
        </span>
      </div>
    </div>
  );
}