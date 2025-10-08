import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import LoginPage from './components/pagina/LoginPage'; // 👈 IMPORTAR LoginPage
import { translations } from './components/data/translations';
import { artists } from './components/data/artists';
import './styles/animations.css';

// Componente principal de la página (separado para usar useNavigate)
const MainPage = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const t = translations[language];

  // Efectos
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4000);
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
    document.body.style.overflow = showIntro ? 'hidden' : 'auto';
  }, [showIntro]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Funciones
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  // 👇 NUEVA: Función para manejar el click en login
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Función para renderizar secciones según activeSection
  const renderActiveSection = () => {
    switch (activeSection) {
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
            <ArtistsSection
              darkMode={darkMode}
              t={t}
              language={language}
              artists={artists}
            />
          </>
        );
    }
  };

  if (showIntro) return <IntroScreen />;

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white'
          : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-100 text-gray-900'
      }`}
    >
      <AnimatedBackground
        darkMode={darkMode}
        mousePosition={mousePosition}
      />

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
        onLoginClick={handleLoginClick} // 👈 PASAR LA FUNCIÓN
      />

      <main className="relative z-10 pt-20">
        {renderActiveSection()}
      </main>
    </div>
  );
};

// Componente App con Router
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<MainPage />} />
        
        {/* Ruta del login */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;