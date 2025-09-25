// src/components/services/ProcessSection.js
import React from 'react';
import ProcessStep from './ProcessStep';

const ProcessSection = ({ darkMode }) => {
  const processSteps = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Analizamos tus necesidades y objetivos para crear la estrategia perfecta."
    },
    {
      step: "02",
      title: "Propuesta & Diseño",
      description: "Desarrollamos una propuesta detallada con mockups y cronograma."
    },
    {
      step: "03",
      title: "Desarrollo",
      description: "Construimos tu proyecto con actualizaciones constantes del progreso."
    },
    {
      step: "04",
      title: "Lanzamiento & Soporte",
      description: "Lanzamos tu proyecto y brindamos soporte continuo post-lanzamiento."
    }
  ];

  return (
    <div className={`rounded-3xl p-12 mb-20 ${
      darkMode
        ? 'bg-gradient-to-r from-gray-800/50 to-blue-900/30 border border-white/10'
        : 'bg-gradient-to-r from-white/50 to-orange-50/50 border border-white/20'
    } backdrop-blur-2xl`}>
      <div className="text-center mb-12">
        <h3 className="text-3xl lg:text-5xl font-black mb-4">
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Nuestro Proceso
          </span>
        </h3>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Un enfoque estructurado para garantizar el éxito de tu proyecto
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {processSteps.map((step, index) => (
          <ProcessStep 
            key={index}
            step={step}
            darkMode={darkMode}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessSection;