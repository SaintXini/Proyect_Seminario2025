// Frontend/src/components/ProjectsSection.jsx
import React, { useState } from 'react';
import ProjectsHeader from './proyectos/ProjectsHeader';
import CategoryFilter from './proyectos/CategoryFilter';
import ProjectsGrid from './proyectos/ProjectsGrid';
import CallToAction from './proyectos/CallToAction';
import BackgroundEffects from './proyectos/BackgroundEffects';
import ProjectDetail from './proyectos/rutas/ProjectDetail';
import { projectsData, categories } from './data/projectsData';

const ProjectsSection = ({ darkMode, t }) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "Todos"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Traducir categorías
  const translatedCategories = categories.map(cat => {
    const categoryMap = {
      'Todos': t.todos,
      'Web App': t.webApp,
      'Mobile App': t.mobileApp,
      'AI/ML': t.aiMl,
      'Design': t.design,
      'Hardware': t.hardware,
      'Evento Benéfico': t.eventoBenefico
    };
    return categoryMap[cat] || cat;
  });

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        darkMode={darkMode}
        t={t}
        onBack={handleBackToProjects}
      />
    );
  }

  return (
    <section className={`min-h-screen py-32 px-4 relative ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
        : 'bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-pink-50/50'
    }`}>
      <BackgroundEffects darkMode={darkMode} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ProjectsHeader darkMode={darkMode} t={t} />
        
        <CategoryFilter
          darkMode={darkMode}
          categories={translatedCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <ProjectsGrid
          darkMode={darkMode}
          projects={filteredProjects}
          t={t}
          onProjectClick={handleProjectClick}
        />
        
        <CallToAction t={t} />
      </div>
    </section>
  );
};

export default ProjectsSection;