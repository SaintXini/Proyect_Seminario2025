// src/App.js - ACTUALIZADO
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbars/Navbar';
import IntroScreen from './components/principal/IntroScreen';
import AnimatedBackground from './components/principal/AnimatedBackground';
import HeroSection from './components/principal/HeroSection';
import StorySection from './components/principal/StorySection';
import TeamSection from './components/principal/TeamSection';
import ArtistsSection from './components/principal/ArtistsSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import { translations } from './components/data/translations';
import { artists } from './components/data/artists';
import './styles/animations.css';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const t = translations[language];

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [showIntro]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handler functions
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (showIntro) {
    return <IntroScreen />;
  }

  // Renderizar sección según la activa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <>
            <HeroSection darkMode={darkMode} t={t} />
            <StorySection darkMode={darkMode} t={t} />
            <TeamSection darkMode={darkMode} t={t} />
            <ArtistsSection darkMode={darkMode} t={t} language={language} artists={artists} />
          </>
        );
      case 'proyectos':
        return <ProjectsSection darkMode={darkMode} t={t} />;
      case 'servicios':
        return <ServicesSection darkMode={darkMode} t={t} />;
      case 'contacto':
        return <ContactSection darkMode={darkMode} t={t} />;
      default:
        return (
          <>
            <HeroSection darkMode={darkMode} t={t} />
            <StorySection darkMode={darkMode} t={t} />
            <TeamSection darkMode={darkMode} t={t} />
            <ArtistsSection darkMode={darkMode} t={t} language={language} artists={artists} />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white'
        : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-100 text-gray-900'
    }`}>
      <AnimatedBackground darkMode={darkMode} mousePosition={mousePosition} />
      
      <Navbar 
        darkMode={darkMode}
        language={language}
        mobileMenuOpen={mobileMenuOpen}
        activeSection={activeSection}
        t={t}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
        toggleMobileMenu={toggleMobileMenu}
        setActiveSection={setActiveSection}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="relative z-10 pt-20">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default App;