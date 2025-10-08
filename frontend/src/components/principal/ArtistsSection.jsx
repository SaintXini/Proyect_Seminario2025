import React from 'react';
import { Star } from 'lucide-react';

const ArtistsSection = ({ darkMode, t, language, artists }) => {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              darkMode ? 'bg-blue-400/10' : 'bg-rose-400/10'
            } animate-float`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase ${
            darkMode
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
              : 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-600 border border-pink-300/50'
          }`}>
            Colaboraciones
          </span>
        </div>

        <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-tight animate-slide-up">
          <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode
              ? 'from-cyan-400 via-blue-400 to-purple-400'
              : 'from-pink-600 via-rose-600 to-orange-600'
          }`}>
            {t.artistsWorked}
          </span>
        </h2>
        
        <p className={`text-xl leading-relaxed mb-16 max-w-4xl mx-auto animate-slide-up-delayed ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {t.artistsText}
        </p>

        {/* Enhanced Artists Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div className="flex animate-scroll-smooth">
              {[...artists, ...artists, ...artists].map((artist, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 mx-6 group"
                >
                  <div className="relative">
                    {/* Glowing background */}
                    <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-500 ${
                      darkMode
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gradient-to-r from-rose-500 to-orange-500'
                    }`} />

                    {/* Card */}
                    <div className={`relative ${
                      darkMode
                        ? 'bg-white/5 backdrop-blur-2xl border border-white/10'
                        : 'bg-white/40 backdrop-blur-2xl border border-white/20'
                    } rounded-3xl p-8 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl`}>
                      
                      {/* Avatar with animated border */}
                      <div className="relative mb-6">
                        <div className={`absolute inset-0 rounded-full animate-spin-slow ${
                          darkMode
                            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500'
                            : 'bg-gradient-to-r from-rose-500 via-orange-500 to-pink-500'
                        } p-1`}>
                          <div className="w-full h-full rounded-full bg-white" />
                        </div>
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="relative z-10 w-32 h-32 rounded-full mx-auto object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        {/* Floating icons */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <h3 className={`font-black text-xl mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {artist.name}
                      </h3>
                      
                      <p className={`text-sm font-medium uppercase tracking-wider ${
                        darkMode ? 'text-blue-300' : 'text-rose-600'
                      }`}>
                        {language === 'es' ? 'Artista Colaborador' : 'Collaborating Artist'}
                      </p>
                      
                      {/* Skill indicators */}
                      <div className="mt-6 flex justify-center space-x-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              darkMode ? 'bg-blue-400' : 'bg-rose-400'
                            } animate-pulse`}
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;