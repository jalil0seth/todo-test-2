import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatBot } from './ChatBot';
import { TaskStats } from './TaskStats';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar with ChatBot */}
      <div className="w-80 border-r bg-white p-4 flex flex-col">
        <ChatBot />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Right Sidebar with Stats and Filters */}
      <div className="w-80 border-l bg-white p-4">
        <TaskStats />
      </div>
    </div>
  );
}