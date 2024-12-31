import React from 'react';
import { Send } from 'lucide-react';
import { chatStyles } from './styles';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  return (
    <div className={chatStyles.input.container}>
      <div className={chatStyles.input.wrapper}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Type your message..."
          className={chatStyles.input.field}
        />
        <button
          onClick={onSend}
          className={chatStyles.input.button}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}