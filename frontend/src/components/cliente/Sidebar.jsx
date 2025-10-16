import React from 'react';
import { ChevronRight } from 'lucide-react';

const Sidebar = ({ darkMode, sidebarOpen, activeSection, setActiveSection, menuItems }) => {
  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 w-64 ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white/20 border-white/30'} backdrop-blur-2xl border-r transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
              activeSection === item.id
                ? darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg'
                : darkMode
                ? 'hover:bg-white/10 text-gray-300'
                : 'hover:bg-white/30 text-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.label}</span>
            {activeSection === item.id && <ChevronRight className="w-5 h-5 ml-auto" />}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;