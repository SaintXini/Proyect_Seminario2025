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
  setMobileMenuOpen,
  onLoginClick  // Nueva prop para manejar el click en login
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
              <svg viewBox="0 0 200 200" className="w-8 h-8">
                {/* Forma tipo tau estilizada */}
                <path
                  d="M60 60 H140 Q145 60 145 70 V85 H115 V140 H95 V85 H60 Z"
                  fill="#dc2626"
                />

                {/* Cubo gris con número 1 */}
                <g>
                  <rect x="115" y="85" width="30" height="30" fill="#9ca3af" />
                  <path d="M115 85 L130 70 L160 70 L145 85 Z" fill="#d1d5db" />
                  <path d="M145 85 L160 70 L160 100 L145 115 Z" fill="#6b7280" />
                  <text
                    x="130"
                    y="105"
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="bold"
                    fill="#ffffff"
                  >
                    1
                  </text>
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
            
            {/* BOTÓN DE LOGIN DESKTOP - MODIFICADO */}
            <button 
              onClick={onLoginClick}
              className={`font-medium px-8 py-3 rounded-2xl transition-all duration-300 hover:scale-105 transform relative overflow-hidden group ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white shadow-lg shadow-rose-500/25'
              }`}
            >
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
              {/* BOTÓN DE LOGIN MÓVIL - MODIFICADO */}
              <button 
                onClick={() => {
                  onLoginClick();
                  setMobileMenuOpen(false);
                }}
                className={`font-medium px-6 py-3 rounded-2xl transition-all duration-300 w-fit ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white shadow-lg shadow-rose-500/25'
                }`}
              >
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