import React from 'react';

const TeamSection = ({ darkMode, t }) => {
  const teamHighlights = [
    { icon: "🚀", text: "Innovación constante" },
    { icon: "🎯", text: "Enfoque en resultados" },
    { icon: "💡", text: "Creatividad sin límites" },
    { icon: "🤝", text: "Colaboración efectiva" }
  ];

  return (
    <section className={`py-32 px-4 relative ${
      darkMode
        ? 'bg-gradient-to-r from-gray-800/30 to-blue-900/20'
        : 'bg-gradient-to-r from-rose-50/80 to-orange-50/60'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_var(--tw-gradient-stops))] from-red-600 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-orange-600 via-transparent to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur-2xl opacity-20 animate-pulse-slow" />
            <div className="relative">
              <img
                src="https://scontent.fgua5-2.fna.fbcdn.net/v/t1.6435-9/38775477_2224472067774231_7086730355188695040_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=k9WwhaG0H94Q7kNvwEKmz5j&_nc_oc=Adn7rHhQFynTIQOJ7yIvO5cY2CWBw6EL6pwlGL0U57ZjK-x0vtzmREGasJFUN38ikRw&_nc_zt=23&_nc_ht=scontent.fgua5-2.fna&_nc_gid=SmG6sphj-3QxCCf9KLdkcA&oh=00_AfZk9uuLb-_Ga_zmno3XzNohqOqxV_uuTzAuB29aHsVICg&oe=68FBA26C"
                alt="Our Team"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover transition-all duration-700 hover:scale-105"
              />
              {/* Team stats overlay */}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-slide-in-right">
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase ${
                darkMode
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-600 border border-orange-300/50'
              }`}>
                Nuestro Equipo
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                darkMode
                  ? 'from-blue-400 via-purple-400 to-blue-400'
                  : 'from-orange-600 via-red-600 to-orange-600'
              }`}>
                {t.ourTeam}
              </span>
            </h2>
            
            <p className={`text-xl leading-relaxed mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t.teamText}
            </p>
            
            {/* Team highlights */}
            <div className="space-y-4 mb-8">
              {teamHighlights.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                      : 'bg-white/40 hover:bg-white/60 border border-white/20'
                  } backdrop-blur-sm`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;