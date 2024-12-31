import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';

interface ChatMessage {
  text: string;
  isBot: boolean;
}

export function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hi! I'm your task assistant. How can I help you?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm here to help you manage your tasks effectively!", 
        isBot: true 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full font-droid bg-[#f6f6ef]">
      <ChatHeader />

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <Message key={i} text={msg.text} isBot={msg.isBot} />
        ))}
        {isLoading && <LoadingIndicator />}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
}