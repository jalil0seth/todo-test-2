import React from 'react';
import { ArrowLeft, Edit2, X } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] transform transition-all duration-200 scale-100"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
            >
              {isEditing ? <X size={20} /> : <ArrowLeft size={20} />}
            </button>
            {title && <h2 className="text-xl font-semibold bg-gradient-to-r from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent">{title}</h2>}
          </div>
          {onEdit && !isEditing && (
            <button
              onClick={onEdit}
              className="btn btn-secondary"
            >
              <Edit2 size={16} /> Edit
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}