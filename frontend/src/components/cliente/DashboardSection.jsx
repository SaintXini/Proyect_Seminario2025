import React, { useState, useEffect } from 'react';
import {
  Calendar, Video, Bell, CheckCircle, Clock,
  AlertCircle, Plus, Edit, Trash2
} from 'lucide-react';
import { getEventIcon, getActionColor, getStatusColor } from './data/helpers';
import { getQuickActions } from './data/constants';
import { 
  getProjects, 
  updateProject, 
  deleteProject,
  getNotifications,
  getCalendarEvents 
} from '../../services/api';

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
  const [notifications, setNotifications] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0
  });

  const quickActions = getQuickActions(t);

  // Cargar datos del backend
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar proyectos
      const projectsResponse = await getProjects();
      const projectsData = projectsResponse.projects || projectsResponse || [];
      setActiveProjectsList(projectsData);
      
      // Calcular estadísticas
      const stats = {
        total: projectsData.length,
        completed: projectsData.filter(p => p.status === 'completed').length,
        inProgress: projectsData.filter(p => p.status === 'inProgress').length,
        pending: projectsData.filter(p => p.status === 'pending').length
      };
      setStats(stats);

      // Cargar notificaciones
      const notificationsResponse = await getNotifications();
      const notificationsData = notificationsResponse.notifications || notificationsResponse || [];
      setNotifications(notificationsData.slice(0, 5));

      // Cargar eventos del calendario
      const currentDate = new Date();
      const eventsResponse = await getCalendarEvents(
          'clients',
          currentDate.getMonth() + 1,
          currentDate.getFullYear()
      );
      const eventsData = eventsResponse.events || eventsResponse || [];
      setUpcomingEvents(eventsData.slice(0, 3)); // Solo los próximos 3

    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setNewProjectForm({
      name: project.name,
      type: project.project_type || 'institutional',
      description: project.description || '',
      deliveryDate: project.delivery_date || '',
    });
    setModalType('editProject');
    setShowModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm(language === 'es' 
      ? '¿Estás seguro de eliminar este proyecto?' 
      : 'Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        setActiveProjectsList(activeProjectsList.filter(p => p.id !== projectId));
        alert(language === 'es' ? 'Proyecto eliminado' : 'Project deleted');
      } catch (error) {
        console.error('Error eliminando proyecto:', error);
        alert(language === 'es' 
          ? 'Error al eliminar proyecto' 
          : 'Error deleting project');
      }
    }
  };

  const handleQuickAction = (actionType) => {
    setRequestForm(prev => ({ ...prev, type: actionType }));
    setModalType('newRequest');
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bienvenida */}
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
          { label: t.totalProjects, value: stats.total, icon: Video, color: 'blue' },
          { label: t.completed, value: stats.completed, icon: CheckCircle, color: 'green' },
          { label: t.inProgress, value: stats.inProgress, icon: Clock, color: 'yellow' },
          { label: t.pending, value: stats.pending, icon: AlertCircle, color: 'orange' },
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
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'} hover:scale-105 transition-transform duration-200`}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{getEventIcon(event.type)}</span>
                    <div className="flex-1">
                      <p className="font-semibold">{event.title}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.date}/{event.month}/{event.year}
                        {event.time && ` • ${event.time}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'es' ? 'No hay eventos próximos' : 'No upcoming events'}
              </p>
            )}
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
            {activeProjectsList.length > 0 ? (
              activeProjectsList.slice(0, 3).map((project) => (
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
                    {t[project.status] || project.status}
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
              ))
            ) : (
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'es' ? 'No hay proyectos activos' : 'No active projects'}
              </p>
            )}
          </div>
        </div>

        {/* Notificaciones */}
        <div className={`p-6 rounded-3xl ${darkMode ? 'bg-white/5' : 'bg-white'} border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center mb-4">
            <Bell className="w-6 h-6 mr-2 text-yellow-500" />
            <h2 className="text-xl font-bold">{t.notifications}</h2>
          </div>
          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'} hover:scale-105 transition-transform duration-200`}
                >
                  <p className="text-sm mb-1">{notification.message}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {notification.time}
                  </p>
                </div>
              ))
            ) : (
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'es' ? 'No hay notificaciones' : 'No notifications'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
