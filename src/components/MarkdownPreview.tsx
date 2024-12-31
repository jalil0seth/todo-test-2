import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown 
        components={{
          h1: ({children}) => <h4 className="text-[#ff6600] font-droid">{children}</h4>,
          h2: ({children}) => <h4 className="text-[#ff6600] font-droid">{children}</h4>,
          h3: ({children}) => <h4 className="text-[#ff6600] font-droid">{children}</h4>,
          h4: ({children}) => <h4 className="text-[#ff6600] font-droid">{children}</h4>,
          p: ({children}) => <p className="text-gray-700 font-droid">{children}</p>,
          a: ({children, href}) => (
            <a 
              href={href} 
              className="text-[#ff6600] no-underline hover:underline font-droid"
            >
              {children}
            </a>
          ),
        }}
      >
        {content || '*No content yet*'}
      </ReactMarkdown>
    </div>
  );
}