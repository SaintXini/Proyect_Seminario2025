// src/components/admin/DashboardView.jsx
import React from 'react';
import { DollarSign, Video, Users, Package } from 'lucide-react';
import { StatsCard } from './StatsCard';

export const DashboardView = ({ darkMode, t, projects, clients, inventoryItems }) => {
  const budgetData = {
    total: 150000,
    spent: projects.reduce((sum, p) => sum + p.budget, 0),
    remaining: 150000 - projects.reduce((sum, p) => sum + p.budget, 0)
  };

  const equipmentData = {
    total: inventoryItems.length,
    available: inventoryItems.filter(i => i.status === 'Disponible').length,
    inUse: inventoryItems.filter(i => i.status === 'En uso').length,
    maintenance: inventoryItems.filter(i => i.status === 'Mantenimiento').length
  };

  return (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {t.welcome}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t.totalBudget}
          value={`$${budgetData.total.toLocaleString()}`}
          icon={DollarSign}
          gradient="from-blue-500 to-purple-500"
          darkMode={darkMode}
        >
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t.spent}</span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {((budgetData.spent / budgetData.total) * 100).toFixed(0)}%
              </span>
            </div>
            <div className={`h-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${(budgetData.spent / budgetData.total) * 100}%` }}
              />
            </div>
          </div>
        </StatsCard>

        <StatsCard
          title={t.activeProjects}
          value={projects.length}
          icon={Video}
          gradient="from-orange-500 to-rose-500"
          darkMode={darkMode}
        />

        <StatsCard
          title={t.activeClients}
          value={clients.filter(c => c.status === 'Activo').length}
          icon={Users}
          gradient="from-purple-500 to-pink-500"
          darkMode={darkMode}
        >
          <div className="mt-4 text-xs">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total: {clients.length} clientes
            </span>
          </div>
        </StatsCard>

        <StatsCard
          title={t.equipment}
          value={equipmentData.total}
          icon={Package}
          gradient="from-green-500 to-teal-500"
          darkMode={darkMode}
        >
          <div className="mt-4 flex gap-2 text-xs">
            <span className={`px-2 py-1 rounded ${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'}`}>
              {equipmentData.available} {t.available}
            </span>
            <span className={`px-2 py-1 rounded ${darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`}>
              {equipmentData.inUse} {t.inUse}
            </span>
          </div>
        </StatsCard>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Resumen de Proyectos Recientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.slice(0, 3).map(project => (
            <div key={project.id} className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {project.name}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {project.client}
              </p>
              <div className="mt-2">
                <div className={`h-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};