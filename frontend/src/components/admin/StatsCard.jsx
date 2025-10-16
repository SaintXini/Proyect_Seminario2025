// src/components/common/StatsCard.jsx
import React from 'react';

export const StatsCard = ({ title, value, icon: Icon, gradient, darkMode, children }) => (
  <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
        <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </p>
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    {children}
  </div>
);