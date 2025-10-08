import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, darkMode, index }) => {
  return (
    <div
      className={`group relative rounded-3xl p-8 transition-all duration-500
        hover:scale-105 ${
          darkMode
            ? 'bg-white/5 backdrop-blur-2xl border border-white/10'
            : 'bg-white/60 backdrop-blur-2xl border border-white/20'
        } ${service.popular ? 'ring-2 ring-orange-500/50' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white
            text-xs font-bold px-4 py-2 rounded-full">
            MÁS POPULAR
          </span>
        </div>
      )}

      {/* Service Icon */}
      <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
        darkMode
          ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400'
          : 'bg-gradient-to-br from-orange-500/20 to-rose-500/20 text-orange-600'
      }`}>
        <service.icon className="w-8 h-8" />
      </div>

      {/* Service Content */}
      <h3 className={`font-black text-2xl mb-4 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        {service.title}
      </h3>

      <p className={`text-base mb-6 leading-relaxed ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {service.description}
      </p>

      {/* Features List */}
      <ul className="space-y-3 mb-6">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center space-x-3">
            <CheckCircle className={`w-4 h-4 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`} />
            <span className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className={`text-2xl font-black mb-6 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        {service.price}
      </div>

      {/* CTA Button */}
      <button className={`w-full py-3 rounded-xl font-medium transition-all
        duration-300 flex items-center justify-center space-x-2 group ${
          service.popular
            ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-500 hover:to-red-500'
            : darkMode
            ? 'border-2 border-white/20 text-white hover:bg-white/10'
            : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}>
        <span>Solicitar Cotización</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default ServiceCard;