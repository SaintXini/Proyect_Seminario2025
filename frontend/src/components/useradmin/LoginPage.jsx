import React, { useState } from 'react';
import { User, Shield, Mail, Lock, ArrowLeft, Eye, EyeOff, Phone, Building } from 'lucide-react';

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    company: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegistering) {
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      console.log('Registro:', { role: selectedRole, ...formData });
      alert(`Registro exitoso como ${selectedRole === 'admin' ? 'Administrador' : 'Cliente'}`);
    } else {
      console.log('Login:', { role: selectedRole, ...formData });
      alert(`Iniciando sesión como ${selectedRole === 'admin' ? 'Administrador' : 'Cliente'}`);
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
      phone: '',
      company: ''
    });
    setIsRegistering(false);
  };

  if (!selectedRole) {
    return (
      <div className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
          : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50'
      }`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-blue-500' : 'bg-rose-500'
          }`} />
          <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-purple-500' : 'bg-orange-500'
          }`} />
        </div>

        <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 60 60" className="w-16 h-16">
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
            <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              The Great One
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Selecciona tu tipo de cuenta
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
            <button
              onClick={() => setSelectedRole('admin')}
              className={`group relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 transform ${
                darkMode
                  ? 'bg-white/10 hover:bg-white/15 border border-white/10'
                  : 'bg-white/60 hover:bg-white/80 border border-white/30'
              } backdrop-blur-2xl shadow-2xl hover:shadow-3xl`}
            >
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                darkMode
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                  : 'bg-gradient-to-br from-rose-500/20 to-orange-500/20'
              }`} />
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 transition-all duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Administrador
                </h3>
                
                <p className={`mb-6 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Accede al panel de control y gestiona toda la plataforma
                </p>
                
                <div className={`inline-flex items-center text-sm font-semibold ${
                  darkMode ? 'text-cyan-400' : 'text-rose-600'
                }`}>
                  Iniciar sesión
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole('client')}
              className={`group relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 transform ${
                darkMode
                  ? 'bg-white/10 hover:bg-white/15 border border-white/10'
                  : 'bg-white/60 hover:bg-white/80 border border-white/30'
              } backdrop-blur-2xl shadow-2xl hover:shadow-3xl`}
            >
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                darkMode
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                  : 'bg-gradient-to-br from-orange-500/20 to-pink-500/20'
              }`} />
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-600 to-rose-600 shadow-lg shadow-rose-500/50 group-hover:shadow-rose-500/70 transition-all duration-300">
                  <User className="w-10 h-10 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Cliente
                </h3>
                
                <p className={`mb-6 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Accede a tus proyectos y servicios personalizados
                </p>
                
                <div className={`inline-flex items-center text-sm font-semibold ${
                  darkMode ? 'text-cyan-400' : 'text-rose-600'
                }`}>
                  Iniciar sesión
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
        : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50'
    }`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-blue-500' : 'bg-rose-500'
        }`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-purple-500' : 'bg-orange-500'
        }`} />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4 py-12">
        <div className={`w-full max-w-md ${
          darkMode
            ? 'bg-white/10 border-white/10'
            : 'bg-white/60 border-white/30'
        } backdrop-blur-2xl rounded-3xl shadow-2xl border p-8`}>
          <button
            onClick={() => {
              setSelectedRole(null);
              resetForm();
            }}
            className={`flex items-center mb-6 transition-all duration-300 hover:scale-105 ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Volver</span>
          </button>

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
              {isRegistering ? 'Crear Cuenta' : (selectedRole === 'admin' ? 'Administrador' : 'Cliente')}
            </h2>
            
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {isRegistering 
                ? `Regístrate como ${selectedRole === 'admin' ? 'administrador' : 'cliente'}`
                : 'Ingresa tus credenciales'
              }
            </p>
          </div>

          <div className="space-y-5">
            {isRegistering && (
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Nombre completo
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

            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Correo electrónico
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

            {isRegistering && selectedRole === 'client' && (
              <>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
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

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Empresa (Opcional)
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
              </>
            )}

            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Contraseña
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

            {isRegistering && (
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Confirmar contraseña
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
                    Recordarme
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
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 transform relative overflow-hidden group ${
                selectedRole === 'admin'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/50'
                  : 'bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 shadow-lg shadow-rose-500/50'
              }`}
            >
              <span className="relative z-10">
                {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {selectedRole === 'client' && (
            <div className="mt-6 text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setFormData({
                      email: '',
                      password: '',
                      confirmPassword: '',
                      name: '',
                      phone: '',
                      company: ''
                    });
                  }}
                  className={`font-semibold transition-colors duration-200 ${
                    darkMode
                      ? 'text-cyan-400 hover:text-cyan-300'
                      : 'text-rose-600 hover:text-rose-700'
                  }`}
                >
                  {isRegistering ? 'Inicia sesión' : 'Regístrate'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;