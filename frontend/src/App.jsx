// App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
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
import LoginPage from './components/pagina/LoginPage';
import {AdminDashboard} from './components/AdminDashboard';
import ClientDashboard from './components/ClientDashboard';
import { translations } from './components/data/translations';
import { artists } from './components/data/artists';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/animations.css';

// Crear Context para compartir estado entre rutas
const AppContext = createContext();

// Hook personalizado para usar el context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  return context;
};

// Provider del Context
const AppProvider = ({ children }) => {
  const [showIntro, setShowIntro] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    showIntro,
    setShowIntro,
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    mobileMenuOpen,
    setMobileMenuOpen,
    activeSection,
    setActiveSection,
    mousePosition,
    setMousePosition,
    currentUser,
    setCurrentUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Componente principal de la página
const MainPage = () => {
  const navigate = useNavigate();
  const {
    showIntro,
    setShowIntro,
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    mobileMenuOpen,
    setMobileMenuOpen,
    activeSection,
    setActiveSection,
    mousePosition,
    setMousePosition
  } = useAppContext();

  const t = translations[language];

  // Efectos
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showIntro, setShowIntro]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setMousePosition]);

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

  // Función para manejar el click en login
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
        onLoginClick={handleLoginClick}
      />

      <main className="relative z-10 pt-20">
        {renderActiveSection()}
      </main>
    </div>
  );
};

// Componente LoginPage Wrapper que usa el context
const LoginPageWrapper = () => {
  const navigate = useNavigate();
  const { darkMode, language, setShowIntro, setActiveSection } = useAppContext();
  const { login } = useAuth();

  // Función para volver al inicio con IntroScreen
  const handleBackToHome = () => {
    setShowIntro(true);
    setActiveSection('inicio');
    navigate('/');
  };

  // Función para manejar el login
  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // La redirección se maneja en el componente LoginPage
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <LoginPage
      darkMode={darkMode}
      language={language}
      onBackClick={handleBackToHome}
      onLogin={handleLogin}
    />
  );
};

// Componente AdminDashboard Wrapper que usa el context
const AdminDashboardWrapper = () => {
  const navigate = useNavigate();
  const { darkMode, language, setShowIntro, setActiveSection } = useAppContext();
  const { user, isAdmin, logout } = useAuth();

  // Verificar autenticación
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  // Función para manejar el logout
  const handleLogout = () => {
    logout();
    setShowIntro(true);
    setActiveSection('inicio');
    navigate('/');
  };

  // Si no hay usuario autorizado, no renderizar
  if (!isAdmin) {
    return null;
  }

  return (
    <AdminDashboard
      darkMode={darkMode}
      language={language}
      onLogout={handleLogout}
    />
  );
};

// Componente ClientDashboard Wrapper que usa el context
const ClientDashboardWrapper = () => {
  const navigate = useNavigate();
  const { darkMode, language, setShowIntro, setActiveSection } = useAppContext();
  const { user, isClient, logout } = useAuth();

  // Verificar autenticación
  useEffect(() => {
    if (!isClient) {
      navigate('/login');
    }
  }, [isClient, navigate]);

  // Función para manejar el logout
  const handleLogout = () => {
    logout();
    setShowIntro(true);
    setActiveSection('inicio');
    navigate('/');
  };

  // Si no hay usuario autorizado, no renderizar
  if (!isClient) {
    return null;
  }

  return (
    <ClientDashboard
      darkMode={darkMode}
      language={language}
      onLogout={handleLogout}
      currentUser={user}
    />
  );
};

// Componente App con Router
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<MainPage />} />
            {/* Ruta del login */}
            <Route path="/login" element={<LoginPageWrapper />} />
            {/* Ruta del admin */}
            <Route path="/admin" element={<AdminDashboardWrapper />} />
            {/* Ruta del cliente */}
            <Route path="/client-dashboard" element={<ClientDashboardWrapper />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;