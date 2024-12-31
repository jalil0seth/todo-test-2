import React from 'react';
import { Priority } from '../types/task';
import { AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { clsx } from 'clsx';

interface PrioritySelectProps {
  value: Priority;
  onChange: (priority: Priority) => void;
}

export function PrioritySelect({ value, onChange }: PrioritySelectProps) {
  const priorities: { value: Priority; label: string; icon: React.ReactNode; color: string }[] = [
    { 
      value: 'low',
      label: 'Low',
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      value: 'medium',
      label: 'Medium',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    },
    {
      value: 'high',
      label: 'High',
      icon: <AlertOctagon className="w-4 h-4" />,
      color: 'text-red-600 bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Priority
      </label>
      <div className="grid grid-cols-3 gap-2">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => onChange(priority.value)}
            className={clsx(
              'flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-colors',
              value === priority.value ? priority.color : 'bg-white border-gray-200 hover:bg-gray-50'
            )}
          >
            {priority.icon}
            <span className="text-sm">{priority.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}