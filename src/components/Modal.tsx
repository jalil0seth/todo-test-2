import React from 'react';
import { ArrowLeft, Edit2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onEdit?: () => void;
  isEditing?: boolean;
}

export function Modal({ isOpen, onClose, title, children, onEdit, isEditing }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="w-full max-w-3xl h-[90vh] bg-white rounded-lg shadow-xl flex flex-col"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b px-6 py-4 bg-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
            >
              <ArrowLeft size={20} />
            </button>
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
          </div>
          {onEdit && !isEditing && (
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
            >
              <Edit2 size={16} /> Edit
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}