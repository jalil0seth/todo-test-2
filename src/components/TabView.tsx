import React from 'react';
import { clsx } from 'clsx';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

export function TabView({ tabs, activeTab, onTabChange, children }: TabViewProps) {
  return (
    <div onClick={e => e.stopPropagation()}>
      <div className="border-b">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => {
                e.stopPropagation();
                onTabChange(tab.id);
              }}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-4">
        {children}
      </div>
    </div>
  );
}