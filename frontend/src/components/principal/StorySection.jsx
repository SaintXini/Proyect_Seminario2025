import React from 'react';
import { Zap } from 'lucide-react';

const StorySection = ({ darkMode, t }) => {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in-left">
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-600 border border-rose-300/50'
              }`}>
                Desde 2003
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
                {t.ourStory}
              </span>
            </h2>
            
            <p className={`text-xl leading-relaxed mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t.storyText}
            </p>
            
            {/* Enhanced stats */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <div className={`text-sm uppercase tracking-wider font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Proyectos
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className={`text-sm uppercase tracking-wider font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Clientes
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-in-right relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-2xl animate-pulse-slow" />
            <div className="relative group">
              <img
                src="https://scontent.fgua5-2.fna.fbcdn.net/v/t1.6435-9/53164959_2357589227795847_291175761644093440_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=y-uR-QKkt3IQ7kNvwHZZcK-&_nc_oc=Adm3x1UxBBDaAyATpBwwSBYK1SsVN5DEdODEN_pcRm-RWTQFa5bT028y5yYh2-uJbyk&_nc_zt=23&_nc_ht=scontent.fgua5-2.fna&_nc_gid=7TyB549ssugyVE-hG3pMeQ&oh=00_AfaCKQDY3FpKNslllqJmI5heNlbVTmPJTGZpHd9m3MB_KA&oe=68FBB59A"
                alt="Our Story"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl" />
              {/* Floating action button */}
              <button className="absolute bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 group">
                <Zap className="w-6 h-6 group-hover:animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;