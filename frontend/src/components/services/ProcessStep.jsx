// src/components/services/ProcessStep.js
import React from 'react';

const ProcessStep = ({ step, darkMode, index }) => {
  return (
    <div className="text-center group">
      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center
        justify-center text-2xl font-black transition-all duration-300 group-hover:scale-110 ${
          darkMode
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
        }`}>
        {step.step}
      </div>

      <h4 className={`font-black text-lg mb-3 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        {step.title}
      </h4>

      <p className={`text-sm leading-relaxed ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {step.description}
      </p>
    </div>
  );
};

export default ProcessStep;