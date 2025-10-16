// src/components/admin/Sidebar.jsx
import React from 'react';
import { Calendar, DollarSign, Package, TrendingUp, Users, Video, LogOut } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, onLogout, darkMode, t }) => {
  const menuItems = [
    { id: 'dashboard', icon: <TrendingUp className="w-5 h-5" />, label: t.dashboard },
    { id: 'projects', icon: <Video className="w-5 h-5" />, label: t.projects },
    { id: 'clients', icon: <Users className="w-5 h-5" />, label: t.clients },
    { id: 'calendar', icon: <Calendar className="w-5 h-5" />, label: t.calendar },
    { id: 'financial', icon: <DollarSign className="w-5 h-5" />, label: t.financial },
    { id: 'inventory', icon: <Package className="w-5 h-5" />, label: t.inventory }
  ];

  return (
    <div className={`w-64 min-h-screen p-6 ${
      darkMode 
        ? 'bg-black/20 backdrop-blur-xl border-r border-white/10' 
        : 'bg-white/50 backdrop-blur-xl border-r border-white/30'
    }`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          The Great One
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Admin Panel</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id
                ? darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-rose-500 to-orange-500 text-white'
                : darkMode
                  ? 'text-gray-400 hover:bg-white/5'
                  : 'text-gray-700 hover:bg-white/50'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-8 transition-all ${
          darkMode
            ? 'text-red-400 hover:bg-red-500/10'
            : 'text-red-600 hover:bg-red-50'
        }`}
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">{t.logout}</span>
      </button>
    </div>
  );
};