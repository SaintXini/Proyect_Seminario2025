import React, { useState, useEffect } from 'react';
import { FolderOpen, Search, Filter, Eye, Download } from 'lucide-react';
import * as api from '../../services/api';
import { getStatusColor } from './data/helpers';

const HistorySection = ({ darkMode, t, projectHistory = [] }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await api.getProjects();
      const projArray = Array.isArray(projectsData) ? projectsData : projectsData.projects || [];
      setProjects(projArray);
    } catch (error) {
      console.error('Error cargando proyectos:', error);
      setProjects(projectHistory);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FolderOpen className="w-8 h-8 mr-3 text-purple-500" />
          <h2 className="text-3xl font-bold">{t.projectHistory}</h2>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder={t.searchProjects}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-2xl ${
                darkMode
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
            />
          </div>
          <button className={`px-4 py-2 rounded-2xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors flex items-center`}>
            <Filter className="w-5 h-5 mr-2" />
            {t.filterBy}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.projectName}
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Cliente
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.deliveryDate}
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.status}
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      No hay proyectos disponibles
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'} hover:bg-white/5 transition-colors`}>
                    <td className="py-4 px-4 font-medium">{project.name}</td>
                    <td className="py-4 px-4">{project.client || 'N/A'}</td>
                    <td className="py-4 px-4">
                      {project.end_date || project.delivery_date
                        ? new Date(project.end_date || project.delivery_date).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status, darkMode)}`}>
                        {t[project.status] || project.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}>
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistorySection;