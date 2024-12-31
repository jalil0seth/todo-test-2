import React from 'react';
import { TimeFrame } from '../types/task';
import { CalendarCheck, Calendar, CalendarClock } from 'lucide-react';
import { clsx } from 'clsx';

interface TimeFrameSelectProps {
  value: TimeFrame;
  onChange: (timeFrame: TimeFrame) => void;
}

export function TimeFrameSelect({ value, onChange }: TimeFrameSelectProps) {
  const timeFrames: { value: TimeFrame; label: string; icon: React.ReactNode }[] = [
    { value: 'today', label: 'Today', icon: <CalendarCheck className="w-4 h-4" /> },
    { value: 'tomorrow', label: 'Tomorrow', icon: <Calendar className="w-4 h-4" /> },
    { value: 'future', label: 'Future', icon: <CalendarClock className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Time Frame
      </label>
      <div className="grid grid-cols-3 gap-2">
        {timeFrames.map((timeFrame) => (
          <button
            key={timeFrame.value}
            type="button"
            onClick={() => onChange(timeFrame.value)}
            className={clsx(
              'flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-colors',
              value === timeFrame.value
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            )}
          >
            {timeFrame.icon}
            <span className="text-sm">{timeFrame.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}