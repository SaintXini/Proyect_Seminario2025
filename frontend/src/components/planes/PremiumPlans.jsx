import React, { useState } from "react";
import { Play } from "lucide-react";
import services from "./images/services";
import "./images/services";

const CinePublicitario = () => {
  const [selectedService, setSelectedService] = useState(0);
  const currentService = services[selectedService];

  // 🎬 Componente para crear fondos
  const CinematicBackground = ({ gradient, image, isMain = false }) => (
    <div className="absolute inset-0">
      {image && (
        <img
          src={image}
          alt="Background"
          className="w-full h-full object-cover"
        />
      )}
      <div
        className={`absolute inset-0 ${
          image ? "bg-black/60" : `bg-gradient-to-br ${gradient}`
        } opacity-80`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
          <div className="absolute top-4 left-0 w-full h-1 bg-black"></div>
          <div className="absolute top-8 left-0 w-full h-1 bg-black"></div>
          {Array.from({ length: isMain ? 20 : 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-black rounded-full opacity-30"
              style={{
                left: `${10 + (i * 40) % 90}%`,
                top: `${20 + (i * 15) % 70}%`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <CinematicBackground
          gradient={currentService.gradient}
          image={currentService.image}
          isMain={true}
        />

        {/* Partículas animadas */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Contenido principal */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <p className="text-blue-200 text-lg mb-6 font-light italic animate-fade-in">
            {currentService.fullDescription}
          </p>

          <div className="flex items-center justify-center mb-6 animate-slide-up">
            <div className="text-blue-300 mr-4 animate-pulse">
              {currentService.icon}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {currentService.title}
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in-delayed">
            {currentService.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-slide-up-delayed">
            {currentService.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <p className="text-sm font-medium">{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto animate-bounce-in">
            <Play className="w-5 h-5 mr-2" />
            Ver Portfolio
          </button>
        </div>
      </div>

      {/* Servicios */}
      <div className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Selecciona un servicio para conocer más detalles
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(index)}
                className={`relative group cursor-pointer rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 ${
                  selectedService === index
                    ? "ring-4 ring-blue-500 scale-105 shadow-2xl shadow-blue-500/50"
                    : "hover:ring-2 hover:ring-blue-400"
                }`}
              >
                <div className="aspect-square relative">
                  <CinematicBackground
                    gradient={service.gradient}
                    image={service.image}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
                    <div className="text-blue-300 mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-sm md:text-base mb-1 text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-200 text-xs md:text-sm">
                      {service.subtitle}
                    </p>
                  </div>

                  {selectedService === index && (
                    <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-2 animate-pulse z-10">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detalles */}
      <div className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="text-blue-400 mr-4 animate-pulse">
              {currentService.icon}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              {currentService.title}
            </h3>
          </div>

          <p className="text-xl text-gray-300 mb-8">
            {currentService.fullDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-black/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
              <h4 className="text-xl font-bold mb-4 text-blue-400">
                Características
              </h4>
              <ul className="space-y-2">
                {currentService.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
              <h4 className="text-xl font-bold mb-4 text-blue-400">
                ¿Por qué elegirnos?
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Combinamos creatividad sin límites con tecnología de vanguardia.
                Nuestro equipo multidisciplinario se adapta a cada proyecto,
                garantizando resultados que superan expectativas y generan
                impacto real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinePublicitario;
