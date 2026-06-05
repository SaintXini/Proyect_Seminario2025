// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Mail, Lock, ArrowLeft, Eye, EyeOff, Phone, Building, Home } from 'lucide-react';
import * as api from '../../services/api';

const LoginPage = ({ darkMode, language, onBackClick, onLogin }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('client');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    telefono: '',
    company: ''
  });

  // Traducciones
  const translations = {
    es: {
      admin: 'Administrador',
      client: 'Cliente',
      createAccount: 'Crear Cuenta',
      login: 'Iniciar Sesión',
      adminAccess: 'Acceso al panel de administración',
      clientAccess: 'Acceso al panel de cliente',
      completeData: 'Completa tus datos para registrarte',
      enterCredentials: 'Ingresa tus credenciales',
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      company: 'Empresa (Opcional)',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      haveAccount: '¿Ya tienes una cuenta?',
      noAccount: '¿No tienes una cuenta?',
      loginButton: 'Inicia sesión',
      registerButton: 'Regístrate',
      adminAccessLink: 'Acceso para administradores',
      clientAccessLink: 'Acceso para clientes',
      backToHome: 'Volver al inicio',
      back: 'Volver',
      passwordMismatch: 'Las contraseñas no coinciden',
      registerSuccess: 'Registro exitoso como',
      loginSuccess: 'Bienvenido',
      completeFields: 'Por favor completa todos los campos requeridos',
      loading: 'Cargando...'
    },
    en: {
      admin: 'Administrator',
      client: 'Client',
      createAccount: 'Create Account',
      login: 'Log In',
      adminAccess: 'Access to admin panel',
      clientAccess: 'Access to client panel',
      completeData: 'Complete your information to register',
      enterCredentials: 'Enter your credentials',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company (Optional)',
      password: 'Password',
      confirmPassword: 'Confirm password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      haveAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      loginButton: 'Log in',
      registerButton: 'Sign up',
      adminAccessLink: 'Administrator access',
      clientAccessLink: 'Client access',
      backToHome: 'Back to home',
      back: 'Back',
      passwordMismatch: 'Passwords do not match',
      registerSuccess: 'Successfully registered as',
      loginSuccess: 'Welcome',
      completeFields: 'Please complete all required fields',
      loading: 'Loading...'
    }
  };

  const currentT = translations[language] || translations.es;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.email || !formData.password) {
      alert(currentT.completeFields);
      return;
    }

    // Validación de contraseñas al registrar
    if (isRegistering && formData.password !== formData.confirmPassword) {
      alert(currentT.passwordMismatch);
      return;
    }

    // Validación de campos requeridos para registro de cliente
    if (isRegistering && selectedRole === 'client' && !formData.name) {
      alert(currentT.completeFields);
      return;
    }

    setIsLoading(true);

    try {
      if (isRegistering) {
        // Registro
        const response = await api.register({
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
          telefono: formData.telefono,
          company: formData.company,
          role: selectedRole
        });

        alert(`${currentT.registerSuccess} ${selectedRole === 'admin' ? currentT.admin : currentT.client}`);
        
        // Limpiar formulario y cambiar a modo login
        resetForm();
        setIsRegistering(false);
      } else {
        // Login
        await onLogin(formData.email, formData.password);
        
        // Obtener el usuario del localStorage (que fue guardado por onLogin)
        const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
        
        // Redirigir según el rol
        if (user && user.role === 'admin') {
          navigate('/admin');
        } else if (user && user.role === 'client') {
          navigate('/client-dashboard');
        }
      }
    } catch (error) {
      console.error('Error en login/registro:', error);
      const errorMessage = error.error || error.message || 'Ocurrió un error. Verifica tus datos.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      telefono: '',
      company: ''
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
        : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50'
    }`}>
      {/* Botón de volver al inicio */}
      <button
        onClick={onBackClick}
        className={`fixed top-6 left-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 transform ${
          darkMode
            ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            : 'bg-white/50 hover:bg-white/70 text-gray-900 border border-white/30'
        } backdrop-blur-xl shadow-lg`}
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">{currentT.backToHome}</span>
      </button>

      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-blue-500' : 'bg-rose-500'
        }`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-purple-500' : 'bg-orange-500'
        }`} />
      </div>

      {/* Contenedor principal */}
      <div className="relative min-h-screen flex items-center justify-center p-4 py-12">
        <div className={`w-full max-w-md ${
          darkMode
            ? 'bg-white/10 border-white/10'
            : 'bg-white/60 border-white/30'
        } backdrop-blur-2xl rounded-3xl shadow-2xl border p-8`}>
          
          {/* Header con logo y botón de volver */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex justify-center">
              <svg viewBox="0 0 60 60" className="w-12 h-12">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 15 L10 30 Q10 37.5 17.5 37.5 L22.5 37.5 Q30 37.5 30 30 L30 15"
                  fill="none"
                  stroke="url(#logoGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <g>
                  <rect x="35" y="22.5" width="10" height="10" fill="url(#logoGradient)"/>
                  <path d="M35 22.5 L40 17.5 L50 17.5 L45 22.5 Z" fill="#b91c1c"/>
                  <path d="M45 22.5 L50 17.5 L50 27.5 L45 32.5 Z" fill="#991b1b"/>
                </g>
              </svg>
            </div>
            {selectedRole === 'admin' && (
              <button
                onClick={() => {
                  setSelectedRole('client');
                  setIsRegistering(false);
                  resetForm();
                }}
                className={`flex items-center text-sm transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="font-medium">{currentT.back}</span>
              </button>
            )}
          </div>

          {/* Título y descripción */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br ${
              selectedRole === 'admin'
                ? 'from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50'
                : 'from-orange-600 to-rose-600 shadow-lg shadow-rose-500/50'
            }`}>
              {selectedRole === 'admin' ? (
                <Shield className="w-8 h-8 text-white" />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {selectedRole === 'admin'
                ? currentT.admin
                : (isRegistering ? currentT.createAccount : currentT.login)
              }
            </h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {selectedRole === 'admin'
                ? currentT.adminAccess
                : (isRegistering ? currentT.completeData : currentT.clientAccess)
              }
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre completo (solo para registro de cliente) */}
            {isRegistering && selectedRole === 'client' && (
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {currentT.fullName}
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Juan Pérez"
                    required={isRegistering && selectedRole === 'client'}
                    className={`w-full pl-12 pr-4 py-3 rounded-2xl transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-cyan-500'
                        : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-400 focus:bg-white/70 focus:border-rose-500'
                    } border focus:outline-none focus:ring-2 ${
                      darkMode ? 'focus:ring-cyan-500/50' : 'focus:ring-rose-500/50'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {currentT.email}
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  required
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-cyan-500'
                      : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-400 focus:bg-white/70 focus:border-rose-500'
                  } border focus:outline-none focus:ring-2 ${
                    darkMode ? 'focus:ring-cyan-500/50' : 'focus:ring-rose-500/50'
                  }`}
                />
              </div>
            </div>

            {/* Teléfono (solo para registro de cliente) */}
            {isRegistering && selectedRole === 'client' && (
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {currentT.phone}
                </label>
                <div className="relative">
                  <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+502 1234-5678"
                    className={`w-full pl-12 pr-4 py-3 rounded-2xl transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-cyan-500'
                        : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-400 focus:bg-white/70 focus:border-rose-500'
                    } border focus:outline-none focus:ring-2 ${
                      darkMode ? 'focus:ring-cyan-500/50' : 'focus:ring-rose-500/50'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Empresa (solo para registro de cliente) */}
            {isRegistering && selectedRole === 'client' && (
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {currentT.company}
                </label>
                <div className="relative">
                  <Building className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Mi Empresa S.A."
                    className={`w-full pl-12 pr-4 py-3 rounded-2xl transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-cyan-500'
                        : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-400 focus:bg-white/70 focus:border-rose-500'
                    } border focus:outline-none focus:ring-2 ${
                      darkMode ? 'focus:ring-cyan-500/50' : 'focus:ring-rose-500/50'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Contraseña */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {currentT.password}
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-12 pr-12 py-3 rounded-2xl transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-cyan-500'
                      : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-400 focus:bg-white/70 focus:border-rose-500'
                  } border focus:outline-none focus:ring-2 ${
                    darkMode ? 'focus:ring-cyan-500/50' : 'focus:ring-rose-500/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  } transition-colors duration-200`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmar contraseña (solo para registro de cliente) */}
            {isRegistering && selectedRole === 'client' && (
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {currentT.confirmPassword}
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required={isRegistering && selectedRole === 'client'}
                    className={`w-full pl-12 pr-12 py-3 rounded-2xl transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-cyan-500'
                        : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-400 focus:bg-white/70 focus:border-rose-500'
                    } border focus:outline-none focus:ring-2 ${
                      darkMode ? 'focus:ring-cyan-500/50' : 'focus:ring-rose-500/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                      darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                    } transition-colors duration-200`}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Recordarme y olvidé contraseña (solo para login) */}
            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className={`w-4 h-4 rounded ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-cyan-500 focus:ring-cyan-500'
                        : 'bg-white/50 border-white/30 text-rose-500 focus:ring-rose-500'
                    } focus:ring-2 focus:ring-offset-0`}
                  />
                  <span className={`ml-2 text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {currentT.rememberMe}
                  </span>
                </label>
                <button
                  type="button"
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    darkMode
                      ? 'text-cyan-400 hover:text-cyan-300'
                      : 'text-rose-600 hover:text-rose-700'
                  }`}
                >
                  {currentT.forgotPassword}
                </button>
              </div>
            )}

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 transform relative overflow-hidden group ${
                selectedRole === 'admin'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/50'
                  : 'bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 shadow-lg shadow-rose-500/50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10">
                {isLoading ? currentT.loading : (isRegistering ? currentT.createAccount : currentT.login)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          {/* Links adicionales */}
          <div className="mt-6 space-y-4">
            {/* Toggle entre login y registro (solo para clientes) */}
            {selectedRole === 'client' && (
              <div className="text-center">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isRegistering ? currentT.haveAccount : currentT.noAccount}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      resetForm();
                    }}
                    className={`font-semibold transition-colors duration-200 ${
                      darkMode
                        ? 'text-cyan-400 hover:text-cyan-300'
                        : 'text-rose-600 hover:text-rose-700'
                    }`}
                  >
                    {isRegistering ? currentT.loginButton : currentT.registerButton}
                  </button>
                </p>
              </div>
            )}

            {/* Separador */}
            <div className={`pt-4 border-t text-center ${
              darkMode ? 'border-white/10' : 'border-gray-300'
            }`}>
              {/* Cambiar entre cliente y admin */}
              {selectedRole === 'client' ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('admin');
                    setIsRegistering(false);
                    resetForm();
                  }}
                  className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${
                    darkMode
                      ? 'text-gray-400 hover:text-blue-400'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {currentT.adminAccessLink}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('client');
                    setIsRegistering(false);
                    resetForm();
                  }}
                  className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${
                    darkMode
                      ? 'text-gray-400 hover:text-rose-400'
                      : 'text-gray-600 hover:text-rose-600'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  {currentT.clientAccessLink}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;