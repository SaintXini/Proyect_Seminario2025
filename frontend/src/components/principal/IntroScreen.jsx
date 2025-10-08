import React from 'react';

const IntroScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#fdf6ec] via-[#f5e9da] to-[#e8d9c3] overflow-hidden">
      {/* Partículas suaves en tonos cálidos */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#d6c2aa] rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center animate-fade-in">
          {/* Logo SVG fiel al diseño */}
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
          </div>

          {/* Texto y eslogan */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-[#3b2f2f] tracking-wide">
              The great one
            </h1>
            <p className="text-lg text-[#6b4f3b] uppercase tracking-widest">
              We make it happen!
            </p>

            {/* Barra de carga */}
            <div className="mt-8 w-64 mx-auto">
              <div className="h-1 bg-[#cbb89e] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-yellow-500 animate-loading-bar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
