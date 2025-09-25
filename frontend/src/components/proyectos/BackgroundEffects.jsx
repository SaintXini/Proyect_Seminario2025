// src/components/ProjectsSection/BackgroundEffects.jsx
import React from 'react';

const BackgroundEffects = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-10 animate-pulse ${
            darkMode ? 'bg-blue-400/20' : 'bg-rose-400/20'
          }`}
          style={{
            width: `${Math.random() * 40 + 20}px`,
            height: `${Math.random() * 40 + 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;