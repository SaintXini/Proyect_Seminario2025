// src/components/HeroSection.js
import React from 'react';

const HeroSection = ({ darkMode, t }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Floating elements around hero */}
        <div className="absolute -top-20 -left-20 w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur-xl opacity-20 animate-float" />
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        
          <div className="mb-8">
            <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
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
            <div className="mt-4 text-center">
              <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                The Great One
              </p>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                WE MAKE IT HAPPEN!
              </p>
            </div>
          </div>
         
        
        <div className="space-y-8">
          <h1 className="text-5xl md:text-8xl font-black leading-tight">
            <span className="inline-block animate-text-reveal bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent bg-size-200 animate-gradient-x">
              {t.welcome.split(' ').map((word, index) => (
                <span
                  key={index}
                  className="inline-block mr-4 animate-word-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>
          
          <p className={`text-xl md:text-3xl font-light leading-relaxed animate-fade-in-up ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t.subtitle}
          </p>
          
          <p className={`text-lg max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delayed ${
            darkMode ? 'text-gray-400' : 'text-gray-700'
          }`}>
            {t.description}
          </p>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 animate-fade-in-up-delayed">
            <button className="group relative px-10 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 overflow-hidden">
              <span className="relative z-10">Explorar Proyectos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
            
            <button className={`group relative px-10 py-4 font-bold text-lg rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            }`}>
              <span className="relative z-10">Conocer Más</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;