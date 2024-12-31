import { ReactNode } from 'react';

export interface Message {
  text: string;
  isBot: boolean;
}

export interface ChatMessageProps {
  text: string;
  isBot: boolean;
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export interface ChatHeaderProps {
  title?: string;
  icon?: ReactNode;
}