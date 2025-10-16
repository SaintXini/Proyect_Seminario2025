import React from 'react';
import { 
  Calendar, Video, Bell, CheckCircle, Clock, 
  AlertCircle, Plus, Edit, Trash2 
} from 'lucide-react';
import { upcomingEvents, notifications } from './data/mockData';
import { getStatusColor, getEventIcon, getActionColor } from './data/helpers';
import { getQuickActions } from './data/constants';

const DashboardSection = ({ 
  darkMode, 
  language, 
  t, 
  activeProjectsList, 
  setActiveProjectsList,
  setShowModal, 
  setModalType,
  setSelectedProject,
  setNewProjectForm,
  setRequestForm
}) => {
  const quickActions = getQuickActions(t);

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

  const handleDeleteProject = (projectId) => {
    if (window.confirm(language === 'es' ? '¿Estás seguro de eliminar este proyecto?' : 'Are you sure you want to delete this project?')) {
      setActiveProjectsList(activeProjectsList.filter(p => p.id !== projectId));
      alert(language === 'es' ? 'Proyecto eliminado' : 'Project deleted');
    }
  };

  const handleQuickAction = (actionType) => {
    setRequestForm(prev => ({ ...prev, type: actionType }));
    setModalType('newRequest');
    setShowModal(true);
  };

  return (
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
              className={`p-6 rounded-2xl bg-gradient-to-br ${getActionColor(action.color, darkMode)} text-white hover:scale-105 transition-all duration-300 shadow-lg text-left`}
            >
              <action.icon className="w-8 h-8 mb-3" />
              <p className="font-bold text-lg">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
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

      {/* Próximas Fechas, Proyectos Activos y Notificaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximas Fechas */}
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

        {/* Proyectos Activos */}
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
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status, darkMode)}`}>
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

        {/* Notificaciones */}
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
};

export default DashboardSection;