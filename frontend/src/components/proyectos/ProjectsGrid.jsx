import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsGrid = ({ darkMode, projects }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          darkMode={darkMode}
          index={index}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;