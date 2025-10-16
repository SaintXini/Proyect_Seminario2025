// src/components/admin/ProjectsView.jsx
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const ProjectsView = ({ 
  darkMode, 
  t, 
  projects, 
  setProjects,
  setShowModal,
  setModalType,
  setEditingItem,
  setFormData
}) => {
  const openModal = (project = null) => {
    setModalType('project');
    setEditingItem(project);
    setFormData(project || {});
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(t.confirmDelete)) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.projectManagement}
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500"
        >
          <Plus className="w-5 h-5" />
          {t.addNew}
        </button>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.client} • {project.status} • ${project.budget.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(project)}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className={`h-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-cyan-300' : 'text-blue-600'}`}>
                  {project.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};