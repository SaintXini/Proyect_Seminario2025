import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, X, Shield, UserCheck } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, darkMode }) => {
  const [loginType, setLoginType] = useState('client'); // 'client' o 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar tokens en localStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user_type', data.user_type);
        localStorage.setItem('user_id', data.user_id);

        alert(`¡Bienvenido! Login exitoso como ${data.user_type}`);
        
        // Redirigir según el tipo de usuario
        if (data.user_type === 'admin') {
          // Redirigir al panel de administración de Django
          window.location.href = 'http://127.0.0.1:8000/admin/';
        } else {
          alert('Panel de cliente en desarrollo');
        }
        
        onClose();
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }

    setIsLoading(false);
  };

  const quickLogin = (username, password) => {
    setFormData({ username, password });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`relative max-w-md w-full mx-4 rounded-3xl shadow-2xl transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white border border-white/10' 
          : 'bg-gradient-to-br from-white via-rose-50 to-orange-50 text-gray-900 border border-white/20'
      }`}>
        
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            darkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/10 text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-8 pb-4 text-center">
          <div className="mx-auto w-16 h-16 mb-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Iniciar Sesión
          </h2>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Accede a tu panel de control
          </p>
        </div>

        {/* Selector tipo de usuario */}
        <div className="px-8 pb-4">
          <div className="flex rounded-2xl p-1 bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-white/10">
            <button
              type="button"
              onClick={() => setLoginType('client')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                loginType === 'client'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span className="font-medium">Cliente</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                loginType === 'admin'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                  : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="font-medium">Admin</span>
            </button>
          </div>
        </div>

        {/* Quick Login Buttons */}
        <div className="px-8 pb-4">
          <p className={`text-xs text-center mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Acceso rápido para pruebas:
          </p>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => quickLogin('cliente1', 'cliente123')}
              className={`flex-1 py-2 px-3 text-xs rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20' 
                  : 'border-blue-500/30 bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              Cliente Demo
            </button>
            <button
              type="button"
              onClick={() => quickLogin('admin', 'admin123')}
              className={`flex-1 py-2 px-3 text-xs rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20' 
                  : 'border-purple-500/30 bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              Admin Demo
            </button>
          </div>
        </div>

        {/* Formulario */}
        <div className="px-8 pb-8">
          <div className="space-y-4">
            {/* Usuario */}
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Usuario"
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                    : 'bg-white/50 border-white/20 text-gray-900 placeholder-gray-500'
                } backdrop-blur-xl`}
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
                className={`w-full pl-12 pr-12 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                    : 'bg-white/50 border-white/20 text-gray-900 placeholder-gray-500'
                } backdrop-blur-xl`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 pr-4 flex items-center ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                } transition-colors duration-300`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Botón submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Iniciando...</span>
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </div>

        {/* Info adicional */}
        <div className={`px-8 pb-8 text-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>
            {loginType === 'admin' 
              ? 'Panel administrativo con gestión completa' 
              : 'Acceso a panel de cliente y reservas'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;