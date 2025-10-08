import React from 'react';
import ServicesHeader from './services/ServicesHeader';
import ServiceCard from './services/ServiceCard';
import ProcessSection from './services/ProcessSection';
import BackgroundEffects from './services/BackgroundEffects';
import { services } from './data/servicesData';

const ServicesSection = ({ darkMode, t }) => {
  return (
    <section className={`min-h-screen py-32 px-4 relative ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20'
        : 'bg-gradient-to-br from-orange-50/50 via-rose-50/30 to-pink-50/50'
    }`}>
      {/* Background Effects */}
      <BackgroundEffects darkMode={darkMode} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ServicesHeader darkMode={darkMode} t={t} />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              darkMode={darkMode}
              index={index}
            />
          ))}
        </div>

        {/* Process Section */}
        <ProcessSection darkMode={darkMode} />

      </div>
    </section>
  );
};

export default ServicesSection;