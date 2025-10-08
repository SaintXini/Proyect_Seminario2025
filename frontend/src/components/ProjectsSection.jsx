import React from 'react';
import ProjectsHeader from './proyectos/ProjectsHeader';
import CategoryFilter from './proyectos/CategoryFilter';
import ProjectsGrid from './proyectos/ProjectsGrid';
import CallToAction from './proyectos/CallToAction';
import BackgroundEffects from './proyectos/BackgroundEffects';
import { projectsData, categories } from './data/projectsData';

const ProjectsSection = ({ darkMode, t }) => {
  const [activeCategory, setActiveCategory] = React.useState("Todos");
  
  const filteredProjects = activeCategory === "Todos"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

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
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <ProjectsGrid 
          darkMode={darkMode}
          projects={filteredProjects}
        />
        
        <CallToAction />
      </div>
    </section>
  );
};

export default ProjectsSection;