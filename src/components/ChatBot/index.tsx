import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';
import { Message } from './types';
import { chatStyles } from './styles';

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
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
    <div className={chatStyles.container}>
      <ChatHeader />

      <div className={chatStyles.messageList}>
        {messages.map((msg, i) => (
          <ChatMessage key={i} text={msg.text} isBot={msg.isBot} />
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