import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';

const Header = ({ darkMode, sidebarOpen, setSidebarOpen, onLogout, t }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white/20 border-white/30'} backdrop-blur-2xl border-b`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/30'} transition-colors mr-4`}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center space-x-3">
            <svg viewBox="0 0 200 200" className="w-8 h-8">
              <path d="M60 60 H140 Q145 60 145 70 V85 H115 V140 H95 V85 H60 Z" fill="#dc2626" />
              <g>
                <rect x="115" y="85" width="30" height="30" fill="#9ca3af" />
                <path d="M115 85 L130 70 L160 70 L145 85 Z" fill="#d1d5db" />
                <path d="M145 85 L160 70 L160 100 L145 115 Z" fill="#6b7280" />
                <text x="130" y="105" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ffffff">1</text>
              </g>
            </svg>
            <span className="font-black text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              The Great One
            </span>
          </div>
        </div>
        <button
          onClick={onLogout}
          className={`flex items-center px-4 py-2 rounded-xl ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/30'} transition-colors`}
        >
          <LogOut className="w-5 h-5 mr-2" />
          {t.logout}
        </button>
      </div>
    </header>
  );
};

export default Header;