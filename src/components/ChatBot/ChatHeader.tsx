import React from 'react';
import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="flex items-center gap-3 p-4 border-b bg-gradient-to-r from-[#ff6600]/5 to-white">
      <Bot className="text-[#ff6600]" />
      <h2 className="font-semibold text-gray-800 font-droid">Task Assistant</h2>
    </div>
  );
}