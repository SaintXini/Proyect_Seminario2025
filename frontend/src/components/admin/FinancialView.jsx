// src/components/admin/FinancialView.jsx
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const FinancialView = ({
  darkMode,
  t,
  projects,
  investments,
  setShowModal,
  setModalType,
  setEditingItem,
  setFormData,
  onDeleteInvestment
}) => {
  const budgetData = {
    total: 150000,
    spent: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
    remaining: 150000 - projects.reduce((sum, p) => sum + (p.budget || 0), 0)
  };

  const openModal = (investment = null) => {
    setModalType('investment');
    setEditingItem(investment);
    setFormData(investment || {});
    setShowModal(true);
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
            <div className="mt-4">
              <div className={`h-4 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${(budgetData.spent / budgetData.total) * 100}%` }}
                />
              </div>
              <p className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {((budgetData.spent / budgetData.total) * 100).toFixed(1)}% utilizado
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Resumen Financiero
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Ingresos</span>
              <span className={`font-semibold text-green-500`}>
                Q{(budgetData.total || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Gastos</span>
              <span className={`font-semibold text-red-500`}>
                Q{(budgetData.spent || 0).toLocaleString()}
              </span>
            </div>
            <div className="border-t border-gray-300 pt-3 flex justify-between">
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Balance</span>
              <span className={`font-bold text-lg ${budgetData.remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                Q{(budgetData.remaining || 0).toLocaleString()}
              </span>
            </div>
          </div>
          {finances && finances.length > 0 && (
            <div className="mt-6">
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Últimas Transacciones
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {finances.slice(0, 5).map(finance => (
                  <div key={finance.id} className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {finance.description}
                    </span>
                    <span className={finance.type === 'ingreso' ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                      {finance.type === 'ingreso' ? '+' : '-'}Q{(finance.amount || 0).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.futureInvestments}
        </h3>
        <div className="space-y-4">
          {investments.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No hay inversiones futuras planificadas
              </p>
            </div>
          ) : (
            investments.map(investment => (
              <div key={investment.id} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {investment.item}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Prioridad: {investment.priority} • Q{(investment.estimated || 0).toLocaleString()}
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
                      onClick={() => onDeleteInvestment(investment.id)}
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
    </div>
  );
};