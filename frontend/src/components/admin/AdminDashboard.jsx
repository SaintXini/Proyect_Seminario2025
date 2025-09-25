// components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, MessageSquare, Package, Calendar, BarChart3, 
  Clock, AlertTriangle, CheckCircle, TrendingUp, Settings 
} from 'lucide-react';

const AdminDashboard = ({ darkMode, user }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/admin/dashboard/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Panel de Administración
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Bienvenido, {user.first_name || user.username}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Clientes Totales"
            value={stats?.users?.total_clients || 0}
            subtitle={`${stats?.users?.active_clients || 0} activos`}
            icon={Users}
            color="blue"
            darkMode={darkMode}
          />
          <StatsCard
            title="Cotizaciones"
            value={stats?.quotations?.total || 0}
            subtitle={`${stats?.quotations?.pending || 0} pendientes`}
            icon={MessageSquare}
            color="green"
            darkMode={darkMode}
          />
          <StatsCard
            title="Equipos"
            value={stats?.inventory?.total_equipment || 0}
            subtitle={`${stats?.inventory?.available_equipment || 0} disponibles`}
            icon={Package}
            color="purple"
            darkMode={darkMode}
          />
          <StatsCard
            title="Eventos Hoy"
            value={stats?.schedule?.today_events || 0}
            subtitle="Programados"
            icon={Calendar}
            color="orange"
            darkMode={darkMode}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Resumen', icon: BarChart3 },
                { id: 'users', label: 'Usuarios', icon: Users },
                { id: 'quotations', label: 'Cotizaciones', icon: MessageSquare },
                { id: 'inventory', label: 'Inventario', icon: Package },
                { id: 'calendar', label: 'Calendario', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab stats={stats} darkMode={darkMode} />}
        {activeTab === 'users' && <UsersTab darkMode={darkMode} />}
        {activeTab === 'quotations' && <QuotationsTab darkMode={darkMode} />}
        {activeTab === 'inventory' && <InventoryTab darkMode={darkMode} />}
        {activeTab === 'calendar' && <CalendarTab darkMode={darkMode} />}
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, subtitle, icon: Icon, color, darkMode }) => {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    green: 'text-green-500 bg-green-500/10 border-green-500/20',
    purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20'
  };

  return (
    <div className={`p-6 rounded-2xl border ${
      darkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white border-gray-200'
    } hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {subtitle}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

const OverviewTab = ({ stats, darkMode }) => {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className={`p-6 rounded-2xl ${
        darkMode ? 'bg-gray-800/50' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton 
            icon={Users} 
            label="Ver Usuarios"
            darkMode={darkMode}
          />
          <QuickActionButton 
            icon={MessageSquare} 
            label="Nuevas Cotizaciones"
            darkMode={darkMode}
          />
          <QuickActionButton 
            icon={Package} 
            label="Inventario"
            darkMode={darkMode}
          />
          <QuickActionButton 
            icon={Settings} 
            label="Configuración"
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertCard
          type="warning"
          title="Stock Bajo"
          message={`${stats?.inventory?.low_stock_materials || 0} materiales necesitan reposición`}
          icon={AlertTriangle}
          darkMode={darkMode}
        />
        <AlertCard
          type="info"
          title="Usuarios Inactivos"
          message={`${stats?.users?.inactive_clients || 0} clientes sin actividad reciente`}
          icon={Clock}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

const UsersTab = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserActivity();
  }, []);

  const fetchUserActivity = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/admin/users/activity/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching user activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/10';
      case 'low_activity': return 'text-yellow-500 bg-yellow-500/10';
      case 'inactive': return 'text-orange-500 bg-orange-500/10';
      case 'very_inactive': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getActivityLabel = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'low_activity': return 'Poca Actividad';
      case 'inactive': return 'Inactivo';
      case 'very_inactive': return 'Muy Inactivo';
      default: return 'Desconocido';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando usuarios...</div>;
  }

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl ${
        darkMode ? 'bg-gray-800/50' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-lg font-semibold mb-6">Actividad de Usuarios</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-4 font-medium">Usuario</th>
                <th className="text-left py-3 px-4 font-medium">Empresa</th>
                <th className="text-left py-3 px-4 font-medium">Última Actividad</th>
                <th className="text-left py-3 px-4 font-medium">Estado</th>
                <th className="text-left py-3 px-4 font-medium">Cotizaciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {user.company || 'N/A'}
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p>{new Date(user.last_activity).toLocaleDateString()}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Hace {user.days_inactive} días
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(user.activity_status)}`}>
                      {getActivityLabel(user.activity_status)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {user.quotations_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const QuotationsTab = ({ darkMode }) => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchQuotations();
  }, [filter]);

  const fetchQuotations = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const url = filter === 'all' 
        ? 'http://localhost:8000/api/admin/quotations/'
        : `http://localhost:8000/api/admin/quotations/?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuotations(data.results || data);
      }
    } catch (error) {
      console.error('Error fetching quotations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'approved': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'rejected': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'completed': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendiente',
      in_progress: 'En Progreso',
      approved: 'Aprobada',
      rejected: 'Rechazada',
      completed: 'Completada'
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex space-x-4">
        {['all', 'pending', 'in_progress', 'approved'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'all' ? 'Todas' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      {/* Quotations List */}
      <div className={`p-6 rounded-2xl ${
        darkMode ? 'bg-gray-800/50' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-lg font-semibold mb-6">Gestión de Cotizaciones</h3>
        
        {loading ? (
          <div className="text-center py-8">Cargando cotizaciones...</div>
        ) : (
          <div className="space-y-4">
            {quotations.map((quotation) => (
              <div
                key={quotation.id}
                className={`p-4 rounded-xl border ${
                  darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
                } hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{quotation.title}</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Cliente: {quotation.client?.full_name || quotation.client?.username}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                    {getStatusLabel(quotation.status)}
                  </span>
                </div>
                
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {quotation.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-sm">
                    {quotation.estimated_amount && (
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Estimado: ${quotation.estimated_amount}
                      </span>
                    )}
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Creada: {new Date(quotation.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    darkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const InventoryTab = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl ${
        darkMode ? 'bg-gray-800/50' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-lg font-semibold mb-4">Control de Inventario</h3>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Funcionalidad de inventario en desarrollo...
        </p>
      </div>
    </div>
  );
};

const CalendarTab = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl ${
        darkMode ? 'bg-gray-800/50' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-lg font-semibold mb-4">Gestión de Calendario</h3>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Funcionalidad de calendario en desarrollo...
        </p>
      </div>
    </div>
  );
};

const QuickActionButton = ({ icon: Icon, label, darkMode }) => {
  return (
    <button className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
      darkMode 
        ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-gray-300'
        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
    }`}>
      <Icon className="w-6 h-6 mx-auto mb-2" />
      <p className="text-sm font-medium">{label}</p>
    </button>
  );
};

const AlertCard = ({ type, title, message, icon: Icon, darkMode }) => {
  const typeColors = {
    warning: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    info: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
    success: 'border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400',
    error: 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400'
  };

  return (
    <div className={`p-4 rounded-xl border ${typeColors[type]}`}>
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm opacity-80">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;