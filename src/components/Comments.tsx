import React, { useState } from 'react';
import { Comment } from '../types/task';
import { format } from 'date-fns';
import { Send } from 'lucide-react';

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export function Comments({ comments, onAddComment }: CommentsProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      if (newComment.trim()) {
        onAddComment(newComment);
        setNewComment('');
      }
    }
  };

  return (
    <div className="mt-6" onClick={e => e.stopPropagation()}>
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm">{comment.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {format(new Date(comment.createdAt), 'MMM d, yyyy HH:mm')}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => {
            e.stopPropagation();
            setNewComment(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onClick={e => e.stopPropagation()}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
}