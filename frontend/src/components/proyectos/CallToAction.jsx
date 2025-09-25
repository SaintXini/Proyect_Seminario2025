// src/components/ProjectsSection/CallToAction.jsx
import React from 'react';

const CallToAction = () => {
  return (
    <div className="text-center mt-16">
      <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
        <span className="relative z-10">Ver Todos los Proyectos</span>
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
      </button>
    </div>
  );
};

export default CallToAction;