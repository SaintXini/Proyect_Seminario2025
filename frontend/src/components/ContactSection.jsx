import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ContactSection = ({ darkMode, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', ''
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      detail: "hello@thegreatone.com",
      description: "Respuesta en 24 horas"
    },
    {
      icon: Phone,
      title: "Teléfono",
      detail: "+502 1234-5678",
      description: "Lun - Vie: 9:00 - 18:00"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      detail: "Guatemala City, GT",
      description: "Zona 10, Guatemala"
    },
    {
      icon: Clock,
      title: "Horario",
      detail: "9:00 AM - 6:00 PM",
      description: "Zona horaria GMT-6"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, name: "LinkedIn", url: "#", color: "text-blue-600" },
    { icon: Twitter, name: "Twitter", url: "#", color: "text-sky-400" },
    { icon: Instagram, name: "Instagram", url: "#", color: "text-pink-600" },
  ];

  const services = [
    "Desarrollo Web",
    "Aplicaciones Móviles", 
    "Diseño UI/UX",
    "E-Commerce",
    "Marketing Digital",
    "Consultoría IT"
  ];

  const budgetRanges = [
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+"
  ];

  return (
    <section className={`min-h-screen py-32 px-4 relative ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900/20 to-purple-900/20' 
        : 'bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/3 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-indigo-500' : 'bg-blue-400'
        } animate-pulse-slow`} />
        <div className={`absolute bottom-1/3 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-purple-500' : 'bg-indigo-400'
        } animate-pulse-slow`} style={{ animationDelay: '3s' }} />
        
        {/* Floating elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-10 animate-float ${
              darkMode ? 'bg-indigo-400' : 'bg-blue-400'
            }`}
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className={`inline-block px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase mb-6 ${
            darkMode
              ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30'
              : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-600 border border-blue-300/50'
          }`}>
            Hablemos
          </span>
          
          <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-tight">
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
              darkMode
                ? 'from-indigo-400 via-purple-400 to-indigo-400'
                : 'from-blue-600 via-indigo-600 to-blue-600'
            }`}>
              {t.contact}
            </span>
          </h2>
          
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            ¿Tienes un proyecto en mente? Estamos aquí para ayudarte a convertir tus ideas en realidad digital.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className={`relative rounded-3xl p-8 ${
            darkMode
              ? 'bg-white/5 backdrop-blur-2xl border border-white/10'
              : 'bg-white/60 backdrop-blur-2xl border border-white/20'
          }`}>
            <h3 className={`text-2xl font-black mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Envíanos un mensaje
            </h3>

            {/* Status Messages */}
            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">¡Mensaje enviado exitosamente!</span>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Error al enviar el mensaje. Intenta nuevamente.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Nombre *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 ${
                        darkMode
                          ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                          : 'bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500'
                      }`}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 ${
                        darkMode
                          ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                          : 'bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500'
                      }`}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Company */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 ${
                    darkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                      : 'bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder="Nombre de tu empresa (opcional)"
                />
              </div>

              {/* Service and Budget */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Servicio de Interés
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/80 border-gray-200 text-gray-800'
                    }`}
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Presupuesto
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/80 border-gray-200 text-gray-800'
                    }`}
                  >
                    <option value="">Rango de presupuesto</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Mensaje *
                </label>
                <div className="relative">
                  <MessageSquare className={`absolute left-4 top-4 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 resize-none ${
                      darkMode
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500'
                    }`}
                    placeholder="Cuéntanos sobre tu proyecto, objetivos y cualquier detalle que consideres importante..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-2xl hover:shadow-blue-500/25'
                } text-white overflow-hidden relative group`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
                
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-3xl transition-all duration-500 hover:scale-105 ${
                    darkMode
                      ? 'bg-white/5 backdrop-blur-2xl border border-white/10'
                      : 'bg-white/60 backdrop-blur-2xl border border-white/20'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      darkMode 
                        ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400' 
                        : 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-600'
                    }`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-black text-lg ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {info.title}
                      </h4>
                      <p className={`font-medium ${
                        darkMode ? 'text-indigo-400' : 'text-blue-600'
                      }`}>
                        {info.detail}
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className={`p-8 rounded-3xl ${
              darkMode
                ? 'bg-gradient-to-r from-gray-800/50 to-indigo-900/30 border border-white/10'
                : 'bg-gradient-to-r from-white/50 to-blue-50/50 border border-white/20'
            } backdrop-blur-2xl`}>
              <h4 className={`font-black text-xl mb-6 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Síguenos
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? 'hover:bg-white/10 border border-white/10'
                        : 'hover:bg-white/60 border border-white/20'
                    } backdrop-blur-sm group`}
                  >
                    <social.icon className={`w-5 h-5 ${social.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className={`font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`p-8 rounded-3xl ${
              darkMode
                ? 'bg-gradient-to-r from-indigo-800/30 to-purple-800/30 border border-white/10'
                : 'bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border border-white/20'
            } backdrop-blur-2xl`}>
              <h4 className={`font-black text-xl mb-6 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                ¿Por qué elegirnos?
              </h4>
              
              <div className="space-y-4">
                {[
                  { number: "500+", label: "Proyectos Completados" },
                  { number: "50+", label: "Clientes Satisfechos" },
                  { number: "8+", label: "Años de Experiencia" },
                  { number: "24/7", label: "Soporte Técnico" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </span>
                    <span className={`font-black text-lg ${
                      darkMode ? 'text-indigo-400' : 'text-blue-600'
                    }`}>
                      {stat.number}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">

          
          <button className="group relative px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 overflow-hidden">
            <span className="relative z-10">Agendar Consulta</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;