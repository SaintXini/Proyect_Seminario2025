// src/components/admin/ClientsView.jsx
import React from 'react';
import { Plus, Edit, Trash2, Users, CheckCircle, Clock } from 'lucide-react';

export const ClientsView = ({
  darkMode,
  t,
  clients,
  projects,
  setShowModal,
  setModalType,
  setEditingItem,
  setFormData,
  onDeleteClient
}) => {
  const activeClients = clients.filter(c => c.status === 'Activo');
  const inactiveClients = clients.filter(c => c.status === 'Inactivo');

  const openModal = (client = null) => {
    setModalType('client');
    setEditingItem(client);
    setFormData(client || {});
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.clientManagement}
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500"
        >
          <Plus className="w-5 h-5" />
          {t.addNew}
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Clientes</p>
              <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {clients.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.activeClients}</p>
              <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {activeClients.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-teal-500">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.inactiveClients}</p>
              <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {inactiveClients.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Clientes Activos */}
      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.activeClients}
        </h2>
        <div className="space-y-4">
          {activeClients.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No hay clientes activos
              </p>
            </div>
          ) : (
            activeClients.map(client => (
              <div key={client.id} className={`p-5 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {client.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-semibold">{t.contact}:</span> {client.contact}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-semibold">{t.email}:</span> {client.email}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-semibold">{t.phone}:</span> {client.phone}
                        </p>
                      </div>
                      <div>
                        {client.since && (
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span className="font-semibold">{t.since}:</span> {new Date(client.since).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                          </p>
                        )}
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-semibold">{t.totalProjects}:</span> {client.projectsCount || 0}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-cyan-300' : 'text-blue-600'} font-semibold`}>
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Presupuesto:</span>
                          {' '}Q{(client.totalBudget || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {client.projectsCount > 0 && projects && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Proyectos actuales:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {projects
                            .filter(p => p.client === client.name)
                            .map(project => (
                              <span
                                key={project.id}
                                className={`text-xs px-2 py-1 rounded ${
                                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {project.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openModal(client)}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteClient(client.id)}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Clientes Inactivos */}
      {inactiveClients.length > 0 && (
        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.inactiveClients}
          </h2>
          <div className="space-y-4">
            {inactiveClients.map(client => (
              <div key={client.id} className={`p-5 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'} opacity-60`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {client.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        darkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-semibold">{t.contact}:</span> {client.contact}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-semibold">{t.email}:</span> {client.email}
                        </p>
                      </div>
                      <div>
                        {client.since && (
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span className="font-semibold">{t.since}:</span> {new Date(client.since).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openModal(client)}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteClient(client.id)}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};