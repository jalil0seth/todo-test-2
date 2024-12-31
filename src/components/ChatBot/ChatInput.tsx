import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#ff6600]/20 focus:border-[#ff6600] outline-none"
        />
        <button
          onClick={onSend}
          className="p-2.5 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-white rounded-lg hover:from-[#ff7711] hover:to-[#ff944d] transition-all duration-200 shadow-sm"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}