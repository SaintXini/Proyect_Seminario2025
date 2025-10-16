import React, { useState } from 'react';
import { 
  Home, Calendar, Video, MessageSquare, FolderOpen, User, 
  Bell, Plus, Clock, CheckCircle, AlertCircle, Send, 
  Upload, LogOut, Menu, X, Search, Filter, Download,
  Eye, ChevronRight, Edit, Trash2, FileText, Image,
  Film, UserPlus, ClipboardList, Settings, Save, XCircle
} from 'lucide-react';

const dashboardTranslations = {
  es: {
    dashboard: 'Dashboard',
    newProject: 'Nuevo Proyecto',
    calendar: 'Calendario',
    meetings: 'Reuniones',
    history: 'Historial',
    profile: 'Perfil',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido',
    upcomingDates: 'Próximas Fechas',
    activeProjects: 'Proyectos Activos',
    notifications: 'Notificaciones',
    generalStatus: 'Estado General',
    totalProjects: 'Total Proyectos',
    completed: 'Completados',
    inProgress: 'En Proceso',
    pending: 'Pendientes',
    editing: 'En Edición',
    review: 'En Revisión',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
    requestNewProject: 'Solicitar Nuevo Proyecto',
    projectName: 'Nombre del Proyecto',
    productionType: 'Tipo de Producción',
    institutional: 'Video Institucional',
    informative: 'Cápsula Informativa',
    eventCoverage: 'Cobertura de Evento',
    description: 'Descripción o Guion Base',
    estimatedDelivery: 'Fecha Estimada de Entrega',
    attachFiles: 'Adjuntar Archivos',
    submitRequest: 'Enviar Solicitud',
    scheduleTracking: 'Seguimiento de Cronograma',
    recording: 'Grabación',
    meeting: 'Reunión',
    delivery: 'Entrega',
    meetingsCommunication: 'Reuniones y Comunicación',
    scheduleMeeting: 'Agendar Reunión',
    proposeDatetime: 'Proponer Fecha y Hora',
    confirmAppointment: 'Confirmar Cita',
    internalMessages: 'Mensajes Internos',
    sendMessage: 'Enviar Mensaje',
    projectHistory: 'Historial de Proyectos',
    searchProjects: 'Buscar proyectos...',
    filterBy: 'Filtrar por',
    deliveryDate: 'Fecha de Entrega',
    status: 'Estado',
    actions: 'Acciones',
    view: 'Ver',
    download: 'Descargar',
    edit: 'Editar',
    delete: 'Eliminar',
    clientProfile: 'Perfil del Cliente',
    basicInfo: 'Información Básica',
    fullName: 'Nombre Completo',
    area: 'Área',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    notificationPreferences: 'Preferencias de Notificación',
    emailNotifications: 'Notificaciones por correo',
    calendarAlerts: 'Alertas de calendario',
    screenNotifications: 'Notificaciones en pantalla',
    saveChanges: 'Guardar Cambios',
    quickActions: 'Acciones Rápidas',
    requestRevision: 'Solicitar Revisión',
    addMaterial: 'Agregar Material',
    requestChange: 'Solicitar Cambio',
    editProject: 'Editar Proyecto',
    requestTypes: 'Tipos de Solicitud',
    revisionRequest: 'Solicitud de Revisión',
    additionalMaterial: 'Material Adicional',
    projectChange: 'Cambio en Proyecto',
    technicalSupport: 'Soporte Técnico',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    editingProject: 'Editando Proyecto',
    newRequest: 'Nueva Solicitud',
    selectRequestType: 'Selecciona el tipo de solicitud',
    requestDetails: 'Detalles de la Solicitud',
    urgency: 'Urgencia',
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    attachments: 'Adjuntos',
  },
  en: {
    dashboard: 'Dashboard',
    newProject: 'New Project',
    calendar: 'Calendar',
    meetings: 'Meetings',
    history: 'History',
    profile: 'Profile',
    logout: 'Logout',
    welcome: 'Welcome',
    upcomingDates: 'Upcoming Dates',
    activeProjects: 'Active Projects',
    notifications: 'Notifications',
    generalStatus: 'General Status',
    totalProjects: 'Total Projects',
    completed: 'Completed',
    inProgress: 'In Progress',
    pending: 'Pending',
    editing: 'Editing',
    review: 'Under Review',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    requestNewProject: 'Request New Project',
    projectName: 'Project Name',
    productionType: 'Production Type',
    institutional: 'Institutional Video',
    informative: 'Informative Capsule',
    eventCoverage: 'Event Coverage',
    description: 'Description or Base Script',
    estimatedDelivery: 'Estimated Delivery Date',
    attachFiles: 'Attach Files',
    submitRequest: 'Submit Request',
    scheduleTracking: 'Schedule Tracking',
    recording: 'Recording',
    meeting: 'Meeting',
    delivery: 'Delivery',
    meetingsCommunication: 'Meetings & Communication',
    scheduleMeeting: 'Schedule Meeting',
    proposeDatetime: 'Propose Date & Time',
    confirmAppointment: 'Confirm Appointment',
    internalMessages: 'Internal Messages',
    sendMessage: 'Send Message',
    projectHistory: 'Project History',
    searchProjects: 'Search projects...',
    filterBy: 'Filter by',
    deliveryDate: 'Delivery Date',
    status: 'Status',
    actions: 'Actions',
    view: 'View',
    download: 'Download',
    edit: 'Edit',
    delete: 'Delete',
    clientProfile: 'Client Profile',
    basicInfo: 'Basic Information',
    fullName: 'Full Name',
    area: 'Area',
    email: 'Email',
    phone: 'Phone',
    notificationPreferences: 'Notification Preferences',
    emailNotifications: 'Email notifications',
    calendarAlerts: 'Calendar alerts',
    screenNotifications: 'Screen notifications',
    saveChanges: 'Save Changes',
    quickActions: 'Quick Actions',
    requestRevision: 'Request Revision',
    addMaterial: 'Add Material',
    requestChange: 'Request Change',
    editProject: 'Edit Project',
    requestTypes: 'Request Types',
    revisionRequest: 'Revision Request',
    additionalMaterial: 'Additional Material',
    projectChange: 'Project Change',
    technicalSupport: 'Technical Support',
    cancel: 'Cancel',
    confirm: 'Confirm',
    editingProject: 'Editing Project',
    newRequest: 'New Request',
    selectRequestType: 'Select request type',
    requestDetails: 'Request Details',
    urgency: 'Urgency',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    attachments: 'Attachments',
  }
};

const ClientDashboard = ({ darkMode, language, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    type: 'institutional',
    description: '',
    deliveryDate: '',
  });

  const [requestForm, setRequestForm] = useState({
    type: '',
    projectId: '',
    details: '',
    urgency: 'medium',
  });

  const t = dashboardTranslations[language] || dashboardTranslations.es;

  const upcomingEvents = [
    { id: 1, type: 'meeting', title: 'Reunión de revisión', date: '2025-10-20', time: '10:00 AM' },
    { id: 2, type: 'recording', title: 'Grabación institucional', date: '2025-10-22', time: '14:00 PM' },
    { id: 3, type: 'delivery', title: 'Entrega video corporativo', date: '2025-10-25', time: '09:00 AM' },
  ];

  const [activeProjectsList, setActiveProjectsList] = useState([
    { id: 1, name: 'Video de bienvenida', status: 'editing', progress: 65 },
    { id: 2, name: 'Cobertura evento anual', status: 'review', progress: 90 },
    { id: 3, name: 'Cápsula informativa Q4', status: 'editing', progress: 45 },
  ]);

  const notifications = [
    { id: 1, message: 'Tu proyecto "Video de bienvenida" está en edición', time: '2h' },
    { id: 2, message: 'Reunión de revisión programada para mañana', time: '5h' },
    { id: 3, message: 'Proyecto "Cápsula Q3" entregado exitosamente', time: '1d' },
  ];

  const [projectHistory, setProjectHistory] = useState([
    { id: 1, name: 'Video corporativo 2024', deliveryDate: '2024-09-15', status: 'delivered' },
    { id: 2, name: 'Evento de capacitación', deliveryDate: '2024-08-20', status: 'delivered' },
    { id: 3, name: 'Campaña interna', deliveryDate: '2024-07-10', status: 'cancelled' },
  ]);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: t.dashboard },
    { id: 'newProject', icon: Plus, label: t.newProject },
    { id: 'calendar', icon: Calendar, label: t.calendar },
    { id: 'meetings', icon: MessageSquare, label: t.meetings },
    { id: 'history', icon: FolderOpen, label: t.history },
    { id: 'profile', icon: User, label: t.profile },
  ];

  const quickActions = [
    { id: 'revision', icon: FileText, label: t.requestRevision, color: 'blue' },
    { id: 'material', icon: Upload, label: t.addMaterial, color: 'green' },
    { id: 'change', icon: Edit, label: t.requestChange, color: 'orange' },
    { id: 'support', icon: Settings, label: t.technicalSupport, color: 'purple' },
  ];

  const handleSubmitProject = () => {
    if (!newProjectForm.name || !newProjectForm.deliveryDate) {
      alert(language === 'es' ? 'Por favor completa todos los campos' : 'Please complete all fields');
      return;
    }
    const newProject = {
      id: Date.now(),
      name: newProjectForm.name,
      status: 'pending',
      progress: 0,
    };
    setActiveProjectsList([...activeProjectsList, newProject]);
    alert(`${language === 'es' ? 'Proyecto enviado exitosamente' : 'Project submitted successfully'}. #${Math.floor(Math.random() * 10000)}`);
    setNewProjectForm({ name: '', type: 'institutional', description: '', deliveryDate: '' });
    setShowModal(false);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setNewProjectForm({
      name: project.name,
      type: 'institutional',
      description: '',
      deliveryDate: '',
    });
    setModalType('editProject');
    setShowModal(true);
  };

  const handleUpdateProject = () => {
    const updatedProjects = activeProjectsList.map(p => 
      p.id === selectedProject.id 
        ? { ...p, name: newProjectForm.name }
        : p
    );
    setActiveProjectsList(updatedProjects);
    alert(language === 'es' ? 'Proyecto actualizado exitosamente' : 'Project updated successfully');
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm(language === 'es' ? '¿Estás seguro de eliminar este proyecto?' : 'Are you sure you want to delete this project?')) {
      setActiveProjectsList(activeProjectsList.filter(p => p.id !== projectId));
      alert(language === 'es' ? 'Proyecto eliminado' : 'Project deleted');
    }
  };

  const handleQuickAction = (actionType) => {
    setRequestForm({ ...requestForm, type: actionType });
    setModalType('newRequest');
    setShowModal(true);
  };

  const handleSubmitRequest = () => {
    if (!requestForm.details) {
      alert(language === 'es' ? 'Por favor describe tu solicitud' : 'Please describe your request');
      return;
    }
    alert(`${language === 'es' ? 'Solicitud enviada exitosamente' : 'Request submitted successfully'}. #${Math.floor(Math.random() * 10000)}`);
    setRequestForm({ type: '', projectId: '', details: '', urgency: 'medium' });
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      editing: darkMode ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-100',
      review: darkMode ? 'text-yellow-400 bg-yellow-500/20' : 'text-yellow-600 bg-yellow-100',
      delivered: darkMode ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-100',
      cancelled: darkMode ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-100',
      pending: darkMode ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-100',
    };
    return colors[status] || colors.editing;
  };

  const getEventIcon = (type) => {
    const icons = {
      meeting: '🗣️',
      recording: '🎬',
      delivery: '💾',
      review: '🕓',
    };
    return icons[type] || '📅';
  };

  const getActionColor = (color) => {
    const colors = {
      blue: darkMode ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500',
      green: darkMode ? 'from-green-600 to-emerald-600' : 'from-green-500 to-emerald-500',
      orange: darkMode ? 'from-orange-600 to-amber-600' : 'from-orange-500 to-amber-500',
      purple: darkMode ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500',
    };
    return colors[color] || colors.blue;
  };

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl ${
        darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'
      } border p-8 shadow-2xl`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl ${
            darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
          } transition-colors`}
        >
          <XCircle className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className={`p-6 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <h1 className="text-3xl font-bold mb-2">{t.welcome}, Juan Pérez</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          {language === 'es' ? 'Gestiona tus proyectos audiovisuales' : 'Manage your audiovisual projects'}
        </p>
      </div>

      {/* Acciones Rápidas */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t.quickActions}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className={`p-6 rounded-2xl bg-gradient-to-br ${getActionColor(action.color)} text-white hover:scale-105 transition-all duration-300 shadow-lg text-left`}
            >
              <action.icon className="w-8 h-8 mb-3" />
              <p className="font-bold text-lg">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: t.totalProjects, value: '12', icon: Video, color: 'blue' },
          { label: t.completed, value: '8', icon: CheckCircle, color: 'green' },
          { label: t.inProgress, value: '3', icon: Clock, color: 'yellow' },
          { label: t.pending, value: '1', icon: AlertCircle, color: 'orange' },
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'} hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-rose-500" />
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 mr-2 text-rose-500" />
            <h2 className="text-xl font-bold">{t.upcomingDates}</h2>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'} hover:scale-105 transition-transform duration-200`}
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{getEventIcon(event.type)}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{event.title}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Video className="w-6 h-6 mr-2 text-blue-500" />
              <h2 className="text-xl font-bold">{t.activeProjects}</h2>
            </div>
            <button
              onClick={() => {
                setModalType('newProject');
                setShowModal(true);
              }}
              className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {activeProjectsList.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-semibold">{project.name}</p>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditProject(project)}
                      className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-red-500/20' : 'hover:bg-red-100'} transition-colors text-red-500`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>
                  {t[project.status]}
                </span>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.progress}% {language === 'es' ? 'completado' : 'completed'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center mb-4">
            <Bell className="w-6 h-6 mr-2 text-yellow-500" />
            <h2 className="text-xl font-bold">{t.notifications}</h2>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'} hover:scale-105 transition-transform duration-200`}
              >
                <p className="text-sm mb-1">{notification.message}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {language === 'es' ? 'Hace' : ''} {notification.time} {language === 'en' ? 'ago' : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewProject = () => (
    <div className={`max-w-3xl mx-auto p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <div className="flex items-center mb-6">
        <Plus className="w-8 h-8 mr-3 text-rose-500" />
        <h2 className="text-3xl font-bold">{t.requestNewProject}</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.projectName}
          </label>
          <input
            type="text"
            value={newProjectForm.name}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
            placeholder="Video de bienvenida para nuevos empleados"
            className={`w-full px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.productionType}
          </label>
          <select
            value={newProjectForm.type}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, type: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          >
            <option value="institutional">{t.institutional}</option>
            <option value="informative">{t.informative}</option>
            <option value="eventCoverage">{t.eventCoverage}</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.description}
          </label>
          <textarea
            value={newProjectForm.description}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
            placeholder="Descripción del objetivo del video..."
            rows="5"
            className={`w-full px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.estimatedDelivery}
          </label>
          <input
            type="date"
            value={newProjectForm.deliveryDate}
            onChange={(e) => setNewProjectForm({ ...newProjectForm, deliveryDate: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.attachFiles}
          </label>
          <div className={`border-2 border-dashed rounded-2xl p-8 text-center ${
            darkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-300 hover:border-gray-400'
          } transition-colors cursor-pointer`}>
            <Upload className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {language === 'es' ? 'Arrastra archivos aquí o haz clic para seleccionar' : 'Drag files here or click to select'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmitProject}
          className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-rose-500/50"
        >
          {t.submitRequest}
        </button>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <div className="flex items-center mb-6">
        <Calendar className="w-8 h-8 mr-3 text-blue-500" />
        <h2 className="text-3xl font-bold">{t.scheduleTracking}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'} hover:scale-105 transition-transform duration-300`}
          >
            <span className="text-4xl mb-3 block">{getEventIcon(event.type)}</span>
            <p className="font-bold mb-2">{event.title}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.date}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMeetings = () => (
    <div className="space-y-6">
      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <MessageSquare className="w-8 h-8 mr-3 text-green-500" />
          <h2 className="text-3xl font-bold">{t.meetingsCommunication}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors text-left`}>
            <Calendar className="w-8 h-8 mb-3 text-blue-500" />
            <h3 className="font-bold text-lg mb-2">{t.scheduleMeeting}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.proposeDatetime}
            </p>
          </button>
          
          <button className={`p-6 rounded-2xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors text-left`}>
            <CheckCircle className="w-8 h-8 mb-3 text-green-500" />
            <h3 className="font-bold text-lg mb-2">{t.confirmAppointment}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'es' ? 'Confirmar citas pendientes' : 'Confirm pending appointments'}
            </p>
          </button>
        </div>
      </div>

      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <h3 className="font-bold text-xl mb-4">{t.internalMessages}</h3>
        <div className={`h-64 mb-4 p-4 rounded-2xl overflow-y-auto ${darkMode ? 'bg-black/20' : 'bg-gray-50'}`}>
          <div className="space-y-3">
            <div className={`p-3 rounded-2xl max-w-xs ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <p className="text-sm">Hola, ¿cómo va el progreso del video?</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10:30 AM</p>
            </div>
            <div className={`p-3 rounded-2xl max-w-xs ml-auto ${darkMode ? 'bg-rose-500/20' : 'bg-rose-100'}`}>
              <p className="text-sm">Está en edición, lo tendremos listo pronto.</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10:45 AM</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={language === 'es' ? 'Escribe un mensaje...' : 'Type a message...'}
            className={`flex-1 px-4 py-3 rounded-2xl ${
              darkMode
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
          />
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:scale-105 transition-transform">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FolderOpen className="w-8 h-8 mr-3 text-purple-500" />
          <h2 className="text-3xl font-bold">{t.projectHistory}</h2>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder={t.searchProjects}
              className={`pl-10 pr-4 py-2 rounded-2xl ${
                darkMode
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
            />
          </div>
          <button className={`px-4 py-2 rounded-2xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors flex items-center`}>
            <Filter className="w-5 h-5 mr-2" />
            {t.filterBy}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.projectName}
              </th>
              <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.deliveryDate}
              </th>
              <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.status}
              </th>
              <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {projectHistory.map((project) => (
              <tr key={project.id} className={`border-b ${darkMode ? 'border-white/10' : 'border-gray-200'} hover:bg-white/5 transition-colors`}>
                <td className="py-4 px-4 font-medium">{project.name}</td>
                <td className="py-4 px-4">{project.deliveryDate}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>
                    {t[project.status]}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}>
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}>
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <User className="w-8 h-8 mr-3 text-indigo-500" />
          <h2 className="text-3xl font-bold">{t.clientProfile}</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-4">{t.basicInfo}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.fullName}
                </label>
                <input
                  type="text"
                  defaultValue="Juan Pérez"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.area}
                </label>
                <input
                  type="text"
                  defaultValue="Marketing"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.email}
                </label>
                <input
                  type="email"
                  defaultValue="juan.perez@empresa.com"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.phone}
                </label>
                <input
                  type="tel"
                  defaultValue="+502 1234-5678"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">{t.notificationPreferences}</h3>
            <div className="space-y-3">
              {[
                { id: 'email', label: t.emailNotifications },
                { id: 'calendar', label: t.calendarAlerts },
                { id: 'screen', label: t.screenNotifications },
              ].map((pref) => (
                <label key={pref.id} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className={`w-5 h-5 rounded ${
                      darkMode
                        ? 'bg-white/5 border-white/10 text-rose-500'
                        : 'bg-gray-50 border-gray-300 text-rose-500'
                    } focus:ring-2 focus:ring-rose-500`}
                  />
                  <span className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {pref.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-rose-500/50">
            {t.saveChanges}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'newProject':
        return renderNewProject();
      case 'calendar':
        return renderCalendar();
      case 'meetings':
        return renderMeetings();
      case 'history':
        return renderHistory();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-100 text-gray-900'}`}>
      <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white/20 border-white/30'} backdrop-blur-2xl border-b`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-xl ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/30'} transition-colors mr-4`}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-3">
              <svg viewBox="0 0 200 200" className="w-8 h-8">
                <path d="M60 60 H140 Q145 60 145 70 V85 H115 V140 H95 V85 H60 Z" fill="#dc2626" />
                <g>
                  <rect x="115" y="85" width="30" height="30" fill="#9ca3af" />
                  <path d="M115 85 L130 70 L160 70 L145 85 Z" fill="#d1d5db" />
                  <path d="M145 85 L160 70 L160 100 L145 115 Z" fill="#6b7280" />
                  <text x="130" y="105" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ffffff">1</text>
                </g>
              </svg>
              <span className="font-black text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                The Great One
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className={`flex items-center px-4 py-2 rounded-xl ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/30'} transition-colors`}
          >
            <LogOut className="w-5 h-5 mr-2" />
            {t.logout}
          </button>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white/20 border-white/30'} backdrop-blur-2xl border-r transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                activeSection === item.id
                  ? darkMode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg'
                  : darkMode
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-white/30 text-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
              {activeSection === item.id && <ChevronRight className="w-5 h-5 ml-auto" />}
            </button>
          ))}
        </nav>
      </aside>

      <main className={`pt-24 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 p-8`}>
        {renderSection()}
      </main>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalType === 'newProject' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.requestNewProject}</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t.projectName}
                  value={newProjectForm.name}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
                <select
                  value={newProjectForm.type}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, type: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                >
                  <option value="institutional">{t.institutional}</option>
                  <option value="informative">{t.informative}</option>
                  <option value="eventCoverage">{t.eventCoverage}</option>
                </select>
                <textarea
                  placeholder={t.description}
                  value={newProjectForm.description}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
                <input
                  type="date"
                  value={newProjectForm.deliveryDate}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, deliveryDate: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
                <button
                  onClick={handleSubmitProject}
                  className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400"
                >
                  {t.submitRequest}
                </button>
              </div>
            </div>
          )}

          {modalType === 'editProject' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.editingProject}</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newProjectForm.name}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
                <button
                  onClick={handleUpdateProject}
                  className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {t.saveChanges}
                </button>
              </div>
            </div>
          )}

          {modalType === 'newRequest' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.newRequest}</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.selectRequestType}
                  </label>
                  <select
                    value={requestForm.type}
                    onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl ${
                      darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                  >
                    <option value="revision">{t.revisionRequest}</option>
                    <option value="material">{t.additionalMaterial}</option>
                    <option value="change">{t.projectChange}</option>
                    <option value="support">{t.technicalSupport}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.urgency}
                  </label>
                  <select
                    value={requestForm.urgency}
                    onChange={(e) => setRequestForm({ ...requestForm, urgency: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl ${
                      darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                  >
                    <option value="low">{t.low}</option>
                    <option value="medium">{t.medium}</option>
                    <option value="high">{t.high}</option>
                  </select>
                </div>
                <textarea
                  placeholder={t.requestDetails}
                  value={requestForm.details}
                  onChange={(e) => setRequestForm({ ...requestForm, details: e.target.value })}
                  rows="5"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-rose-500`}
                />
                <div className={`border-2 border-dashed rounded-2xl p-6 text-center ${
                  darkMode ? 'border-white/10' : 'border-gray-300'
                }`}>
                  <Upload className={`w-10 h-10 mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.attachments}</p>
                </div>
                <button
                  onClick={handleSubmitRequest}
                  className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400"
                >
                  {t.submitRequest}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [language, setLanguage] = React.useState('es');

  return (
    <ClientDashboard
      darkMode={darkMode}
      language={language}
      onLogout={() => alert('Cerrando sesión...')}
    />
  );
};

export default App;