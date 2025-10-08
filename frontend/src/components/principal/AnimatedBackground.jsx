import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const AnimatedBackground = ({ darkMode, mousePosition }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className={`absolute animate-float opacity-30 ${
            darkMode ? 'text-blue-400' : 'text-rose-400'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          {i % 3 === 0 ? <Sparkles className="w-2 h-2" /> :
           i % 3 === 1 ? <Star className="w-1 h-1" /> :
           <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-rose-400'}`} />}
        </div>
      ))}
      
      {/* Gradient orbs */}
      <div
        className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse-slow ${
          darkMode
            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500'
            : 'bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400'
        }`}
        style={{
          left: `${mousePosition.x - 10}%`,
          top: `${mousePosition.y - 10}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease-out'
        }}
      />
      
      <div
        className={`absolute w-64 h-64 rounded-full blur-2xl opacity-15 animate-pulse-slow ${
          darkMode
            ? 'bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600'
            : 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-400'
        }`}
        style={{
          right: `${100 - mousePosition.x - 5}%`,
          bottom: `${100 - mousePosition.y - 5}%`,
          transform: 'translate(50%, 50%)',
          transition: 'all 0.5s ease-out',
          animationDelay: '1s'
        }}
      />
      
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute inset-0 ${
          darkMode
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3)_0%,transparent_50%)]'
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.3)_0%,transparent_50%)]'
        } animate-pulse-slow`} />
      </div>
    </div>
  );
};

export default AnimatedBackground;