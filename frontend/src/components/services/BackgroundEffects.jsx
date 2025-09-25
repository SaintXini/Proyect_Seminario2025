// src/components/services/BackgroundEffects.js
import React from 'react';

const BackgroundEffects = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl
        opacity-20 ${
          darkMode ? 'bg-purple-500' : 'bg-orange-400'
        } animate-pulse-slow`} />
      
      <div className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl
        opacity-20 ${
          darkMode ? 'bg-blue-500' : 'bg-rose-400'
        } animate-pulse-slow`} 
        style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default BackgroundEffects;