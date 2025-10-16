// Frontend/src/components/proyectos/ProjectCard.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, darkMode, index, t, onProjectClick }) => {
  const getCategoryGradient = (category) => {
    switch (category.toLowerCase()) {
      case 'evento benéfico':
      case 'charity event':
        return 'from-amber-600 via-orange-500 to-yellow-600';
      case 'mobile app':
        return 'from-cyan-600 via-blue-500 to-indigo-600';
      case 'web app':
        return 'from-purple-600 via-pink-500 to-rose-600';
      case 'ai/ml':
        return 'from-green-600 via-emerald-500 to-teal-600';
      case 'design':
      case 'diseño':
        return 'from-red-600 via-rose-500 to-pink-600';
      case 'hardware':
        return 'from-gray-600 via-slate-500 to-zinc-600';
      default:
        return 'from-gray-600 via-gray-500 to-gray-600';
    }
  };

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer ${
        darkMode
          ? 'bg-black/20 backdrop-blur-xl border border-white/10'
          : 'bg-white/40 backdrop-blur-xl border border-white/20'
      }`}
      style={{
        animationDelay: `${index * 0.1}s`,
        minHeight: '400px'
      }}
      onClick={() => onProjectClick(project)}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '66.67%' }}>
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            style={{ objectPosition: 'center' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className={`text-3xl md:text-4xl font-black text-white tracking-wider bg-gradient-to-r ${getCategoryGradient(project.category)} bg-clip-text text-transparent drop-shadow-2xl px-4 text-center`}>
            {project.category.toUpperCase()}
          </h3>
        </div>
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
              <ExternalLink className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h4 className={`font-bold text-lg mb-2 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {t.projectDetails?.[project.id]?.title || project.title}
        </h4>
        <p className={`text-sm mb-4 leading-relaxed ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {t.projectDetails?.[project.id]?.description || project.description}
        </p>

        {/* Action Button */}
        <button 
          className={`w-full bg-gradient-to-r ${getCategoryGradient(project.category)} text-white py-2 px-4 rounded-lg font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}
        >
          <span>{t.verProyecto}</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;