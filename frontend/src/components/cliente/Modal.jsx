import React from 'react';
import { XCircle } from 'lucide-react';

const Modal = ({ children, onClose, darkMode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl ${
      darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'
    } border p-8 shadow-2xl`}>
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 p-2 rounded-xl ${
          darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
        } transition-colors`}
      >
        <XCircle className="w-6 h-6" />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;