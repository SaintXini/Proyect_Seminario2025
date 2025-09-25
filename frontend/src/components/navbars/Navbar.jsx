// src/components/Navbar.js
import React from 'react';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';

const Navbar = ({ 
  darkMode, 
  language, 
  mobileMenuOpen, 
  activeSection, 
  t, 
  toggleDarkMode, 
  toggleLanguage, 
  toggleMobileMenu, 
  setActiveSection, 
  setMobileMenuOpen 
}) => {
  const menuItems = ['inicio', 'proyectos', 'servicios', 'contacto'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      darkMode
        ? 'bg-black/10 backdrop-blur-2xl border-white/5 shadow-2xl shadow-blue-500/5'
        : 'bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl shadow-rose-500/10'
    } border-b supports-[backdrop-filter]:bg-opacity-60`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <svg viewBox="0 0 60 60" className="w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                <defs>
                  <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 15 L10 30 Q10 37.5 17.5 37.5 L22.5 37.5 Q30 37.5 30 30 L30 15"
                  fill="none"
                  stroke="url(#navGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <g>
                  <rect x="35" y="22.5" width="10" height="10" fill="url(#navGradient)"/>
                  <path d="M35 22.5 L40 17.5 L50 17.5 L45 22.5 Z" fill="#b91c1c"/>
                  <path d="M45 22.5 L50 17.5 L50 27.5 L45 32.5 Z" fill="#991b1b"/>
                </g>
              </svg>
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-black text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              The Great One
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`relative capitalize font-medium transition-all duration-300 hover:scale-105 group ${
                  activeSection === item
                    ? darkMode
                      ? 'text-cyan-400'
                      : 'text-rose-600'
                    : darkMode
                    ? 'text-gray-300 hover:text-cyan-300'
                    : 'text-gray-700 hover:text-rose-500'
                }`}
              >
                {t[item]}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r transition-all duration-300 ${
                  activeSection === item
                    ? 'w-full from-red-500 to-orange-500'
                    : 'w-0 group-hover:w-full from-red-400 to-orange-400'
                }`} />
              </button>
            ))}
            
            <button className={`font-medium px-8 py-3 rounded-2xl transition-all duration-300 hover:scale-105 transform relative overflow-hidden group ${
              darkMode
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white shadow-lg shadow-rose-500/25'
            }`}>
              <span className="relative z-10">{t.login}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Enhanced Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 relative group ${
                darkMode
                  ? 'hover:bg-white/10 text-cyan-300 hover:text-cyan-200 border border-white/10'
                  : 'hover:bg-white/20 text-rose-600 hover:text-rose-700 border border-white/20'
              } backdrop-blur-xl`}
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-sm font-bold">
                {language.toUpperCase()}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 relative group ${
                darkMode
                  ? 'hover:bg-white/10 text-yellow-300 hover:text-yellow-200 border border-white/10'
                  : 'hover:bg-white/20 text-purple-600 hover:text-purple-700 border border-white/20'
              } backdrop-blur-xl`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'hover:bg-white/10 text-gray-300 border border-white/10'
                  : 'hover:bg-white/20 text-gray-600 border border-white/20'
              } backdrop-blur-xl`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-6 border-t backdrop-blur-2xl rounded-b-3xl mt-2 ${
            darkMode
              ? 'border-white/10 bg-black/20'
              : 'border-white/20 bg-white/20'
          }`}>
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveSection(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left capitalize font-medium transition-all duration-300 p-4 rounded-2xl ${
                    activeSection === item
                      ? darkMode
                        ? 'text-cyan-400 bg-white/10'
                        : 'text-rose-600 bg-white/30'
                      : darkMode
                      ? 'text-gray-300 hover:text-cyan-300 hover:bg-white/5'
                      : 'text-gray-700 hover:text-rose-500 hover:bg-white/20'
                  }`}
                >
                  {t[item]}
                </button>
              ))}
              <button className={`font-medium px-6 py-3 rounded-2xl transition-all duration-300 w-fit ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white shadow-lg shadow-rose-500/25'
              }`}>
                {t.login}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;