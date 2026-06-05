import React, { useState } from 'react';
import { Plus, Edit, Trash2, AlertCircle, TrendingUp, Target, BookOpen, Zap } from 'lucide-react';

const iconMap = {
  'mic-2': '🎤',
  'alert-circle': '⚠️',
  'trending-down': '📉',
  'target': '🎯',
  'book': '📚',
  'check': '✅',
  'lightbulb': '💡',
  'zap': '⚡'
};

const priorityColors = {
  alta: 'from-red-500 to-orange-500',
  media: 'from-yellow-500 to-amber-500',
  baja: 'from-blue-500 to-cyan-500'
};

const priorityBgColors = {
  alta: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  media: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  baja: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
};

export const RecommendationsView = ({
  darkMode,
  t,
  recommendations,
  setRecommendations,
  setShowModal,
  setModalType,
  setEditingItem,
  setFormData,
  onDeleteRecommendation
}) => {
  const [filterStatus, setFilterStatus] = useState('activa');
  const [filterPriority, setFilterPriority] = useState('');

  const openModal = (recommendation = null) => {
    setModalType('recommendation');
    setEditingItem(recommendation);
    setFormData(recommendation || {});
    setShowModal(true);
  };

  const filteredRecommendations = recommendations.filter(rec => {
    if (filterStatus && rec.status !== filterStatus) return false;
    if (filterPriority && rec.priority !== filterPriority) return false;
    return true;
  });

  const activeCount = recommendations.filter(r => r.status === 'activa').length;
  const highPriorityCount = recommendations.filter(r => r.priority === 'alta').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Recomendaciones del Sistema
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500"
        >
          <Plus className="w-5 h-5" />
          Nueva
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Recomendaciones Activas</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>{activeCount}</p>
            </div>
            <Zap className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          </div>
        </div>

        <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Prioridad Alta</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-red-300' : 'text-red-600'}`}>{highPriorityCount}</p>
            </div>
            <AlertCircle className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
          </div>
        </div>

        <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-green-300' : 'text-green-600'}`}>{recommendations.length}</p>
            </div>
            <Target className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`px-4 py-2 rounded-lg font-medium ${
            darkMode
              ? 'bg-white/5 border border-white/10 text-white'
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="">Estado: Todos</option>
          <option value="activa">Activas</option>
          <option value="completada">Completadas</option>
          <option value="rechazada">Rechazadas</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className={`px-4 py-2 rounded-lg font-medium ${
            darkMode
              ? 'bg-white/5 border border-white/10 text-white'
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="">Prioridad: Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      {/* Lista de recomendaciones */}
      <div className="space-y-4">
        {filteredRecommendations.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No hay recomendaciones que coincidan con los filtros
            </p>
          </div>
        ) : (
          filteredRecommendations.map(recommendation => (
            <div
              key={recommendation.id}
              className={`p-6 rounded-xl border-2 ${
                recommendation.status === 'activa'
                  ? darkMode
                    ? 'bg-white/5 border-white/20'
                    : 'bg-white border-gray-200'
                  : darkMode
                  ? 'bg-white/2 border-gray-700 opacity-60'
                  : 'bg-gray-50 border-gray-300 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{iconMap[recommendation.icon] || '💡'}</span>
                    <div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {recommendation.title}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityBgColors[recommendation.priority] || priorityBgColors.media}`}>
                          {recommendation.priority.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          recommendation.status === 'activa'
                            ? darkMode
                              ? 'bg-green-900/30 text-green-300'
                              : 'bg-green-100 text-green-700'
                            : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-300 text-gray-700'
                        }`}>
                          {recommendation.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                    {recommendation.description}
                  </p>
                  {recommendation.category && (
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Categoría: <span className="font-semibold">{recommendation.category}</span>
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(recommendation)}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteRecommendation && onDeleteRecommendation(recommendation.id)}
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
  );
};
