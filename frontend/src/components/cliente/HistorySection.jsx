import React from 'react';
import { FolderOpen, Search, Filter, Eye, Download } from 'lucide-react';
import { getStatusColor } from './data/helpers';

const HistorySection = ({ darkMode, t, projectHistory }) => {
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.projectName}
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
            {projectHistory.map((project) => (
              <tr key={project.id} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'} hover:bg-white/5 transition-colors`}>
                <td className="py-4 px-4 font-medium">{project.name}</td>
                <td className="py-4 px-4">{project.deliveryDate}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status, darkMode)}`}>
                    {t[project.status]}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorySection;