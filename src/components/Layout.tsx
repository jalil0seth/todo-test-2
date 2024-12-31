import React from 'react';
import { ChatBot } from './ChatBot';
import { TaskStats } from './TaskStats';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#f6f6ef]">
      <header className="bg-[#ff6600] px-4 py-2 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-white">Task Manager</h1>
            <nav className="flex gap-6">
              <a href="#" className="text-sm text-white hover:text-white/80">Tasks</a>
              <a href="#" className="text-sm text-white hover:text-white/80">Projects</a>
              <a href="#" className="text-sm text-white hover:text-white/80">Analytics</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn bg-white/10 text-white hover:bg-white/20">
              Settings
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto flex gap-6 p-4">
        <aside className="w-80 sticky top-20 h-[calc(100vh-5rem)]">
          <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden">
            <ChatBot />
          </div>
        </aside>
        
        <main className="flex-1 min-w-0">
          {children}
        </main>
        
        <aside className="w-72 sticky top-20 h-[calc(100vh-5rem)]">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <TaskStats />
          </div>
        </aside>
      </div>
    </div>
  );
}