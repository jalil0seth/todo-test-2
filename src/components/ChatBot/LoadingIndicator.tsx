import React from 'react';

export function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="chat-message chat-message-bot">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}