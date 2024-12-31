import React from 'react';
import { clsx } from 'clsx';
import { ChatMessageProps } from './types';
import { chatStyles } from './styles';

export function ChatMessage({ text, isBot }: ChatMessageProps) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={clsx(
        chatStyles.message.base,
        isBot ? chatStyles.message.bot : chatStyles.message.user
      )}>
        {text}
      </div>
    </div>
  );
}