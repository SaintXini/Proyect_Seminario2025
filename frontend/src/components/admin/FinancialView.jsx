// src/components/admin/FinancialView.jsx
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const FinancialView = ({ 
  darkMode, 
  t, 
  projects,
  investments,
  setInvestments,
  setShowModal,
  setModalType,
  setEditingItem,
  setFormData
}) => {
  const budgetData = {
    total: 150000,
    spent: projects.reduce((sum, p) => sum + p.budget, 0),
    remaining: 150000 - projects.reduce((sum, p) => sum + p.budget, 0)
  };

  const openModal = (investment = null) => {
    setModalType('investment');
    setEditingItem(investment);
    setFormData(investment || {});
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(t.confirmDelete)) {
      setInvestments(investments.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.financialReports}
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500"
        >
          <Plus className="w-5 h-5" />
          {t.addNew}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.budgetExecution}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between mb-2">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Planificado</span>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Q{budgetData.total.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Ejecutado</span>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Q{budgetData.spent.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Disponible</span>
              <span className={`font-semibold ${darkMode ? 'text-cyan-300' : 'text-blue-600'}`}>
                Q{budgetData.remaining.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Distribución por Proyecto
          </h3>
          <div className="space-y-3">
            {projects.map(project => (
              <div key={project.id} className="flex justify-between">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate mr-2`}>{project.name}</span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Q{project.budget.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.futureInvestments}
        </h3>
        <div className="space-y-4">
          {investments.map(investment => (
            <div key={investment.id} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {investment.item}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Prioridad: {investment.priority} • Q{investment.estimated.toLocaleString()}
                  </p>
                  {investment.notes && (
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {investment.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(investment)}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(investment.id)}
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
    </div>
  );
};
