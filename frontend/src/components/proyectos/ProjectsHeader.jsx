// Frontend/src/components/proyectos/ProjectsHeader.jsx
import React from 'react';

const ProjectsHeader = ({ darkMode, t }) => {
  return (
    <div className="text-center mb-16">
      <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase mb-6 ${
        darkMode
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30'
          : 'bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-600 border border-rose-300/50'
      }`}>
        {t.nuestroTrabajo}
      </span>
      <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
        <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
          {t.proyectosTitle}
        </span>
      </h2>
      <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {t.proyectosSubtitle}
      </p>
    </div>
  );
};

export default ProjectsHeader;