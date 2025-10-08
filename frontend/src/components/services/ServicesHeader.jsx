import React from 'react';

const ServicesHeader = ({ darkMode, t }) => {
  return (
    <div className="text-center mb-20">
      <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold
        tracking-wider uppercase mb-6 ${
          darkMode
            ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30'
            : 'bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-orange-600 border border-orange-300/50'
        }`}>
        Nuestros Servicios
      </span>

      <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-tight">
        <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
          darkMode
            ? 'from-purple-400 via-blue-400 to-purple-400'
            : 'from-orange-600 via-red-600 to-orange-600'
        }`}>
          {t.services}
        </span>
      </h2>

      <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Ofrecemos soluciones tecnológicas completas para transformar tu visión en realidad digital.
      </p>
    </div>
  );
};

export default ServicesHeader;