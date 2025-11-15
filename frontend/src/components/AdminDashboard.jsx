// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { translations } from './admin/data/translations';
import * as api from '../services/api';

// Importar componentes
import { Sidebar } from './admin/Sidebar';
import { Modal } from './admin/Modal';
import { DashboardView } from './admin/DashboardView';
import { ProjectsView } from './admin/ProjectsView';
import { ClientsView } from './admin/ClientsView';
import { CalendarView } from './admin/CalendarView';
import { FinancialView } from './admin/FinancialView';
import { InventoryView } from './admin/InventoryView';

export const AdminDashboard = ({ darkMode, language, onLogout }) => {
  // Estados de navegación
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Estados para el calendario
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeCalendar, setActiveCalendar] = useState('clients');
  
  // Estados para el modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  
  // Estados de datos
  const [projects, setProjects] = useState([]);
  const [clientEvents, setClientEvents] = useState([]);
  const [companyEvents, setCompanyEvents] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [clients, setClients] = useState([]);
  
  // Estados de carga
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Traducciones
  const t = translations[language] || translations.es;

  // Cargar datos del backend al montar el componente
  useEffect(() => {
    loadAllData();
  }, []);

  // Cargar eventos del calendario cuando cambie el mes o el tipo
  useEffect(() => {
    loadCalendarEvents();
  }, [currentMonth, activeCalendar]);

  const loadAllData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [projectsData, clientsData, inventoryData, investmentsData] = await Promise.all([
        api.getProjects(),
        api.getClients(),
        api.getInventory(),
        api.getInvestments()
      ]);
      
      setProjects(projectsData);
      setClients(clientsData);
      setInventoryItems(inventoryData);
      setInvestments(investmentsData);
      
      console.log('✅ Datos cargados correctamente');
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
      setError('Error al cargar los datos. Por favor, recarga la página.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCalendarEvents = async () => {
    try {
      const month = currentMonth.getMonth() + 1; // JavaScript usa 0-11
      const year = currentMonth.getFullYear();
      
      const events = await api.getCalendarEvents(activeCalendar, month, year);
      
      if (activeCalendar === 'clients') {
        setClientEvents(events);
      } else {
        setCompanyEvents(events);
      }
    } catch (error) {
      console.error('Error cargando eventos del calendario:', error);
    }
  };

  // Funciones del modal
  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
    setFormData({});
  };

  const handleSave = async () => {
    try {
      if (modalType === 'project') {
        if (editingItem) {
          const updated = await api.updateProject(editingItem.id, formData);
          setProjects(projects.map(p => p.id === editingItem.id ? updated : p));
        } else {
          const created = await api.createProject(formData);
          setProjects([...projects, created]);
        }
      } else if (modalType === 'inventory') {
        if (editingItem) {
          const updated = await api.updateInventoryItem(editingItem.id, formData);
          setInventoryItems(inventoryItems.map(i => i.id === editingItem.id ? updated : i));
        } else {
          const created = await api.createInventoryItem(formData);
          setInventoryItems([...inventoryItems, created]);
        }
      } else if (modalType === 'investment') {
        if (editingItem) {
          const updated = await api.updateInvestment(editingItem.id, formData);
          setInvestments(investments.map(i => i.id === editingItem.id ? updated : i));
        } else {
          const created = await api.createInvestment(formData);
          setInvestments([...investments, created]);
        }
      } else if (modalType === 'clientEvent' || modalType === 'companyEvent') {
        const calendarType = modalType === 'clientEvent' ? 'clients' : 'company';
        const eventData = {
          ...formData,
          calendar_type: calendarType,
          month: currentMonth.getMonth() + 1,
          year: currentMonth.getFullYear()
        };
        
        if (editingItem) {
          const updated = await api.updateCalendarEvent(editingItem.id, eventData);
          if (calendarType === 'clients') {
            setClientEvents(clientEvents.map(e => e.id === editingItem.id ? updated : e));
          } else {
            setCompanyEvents(companyEvents.map(e => e.id === editingItem.id ? updated : e));
          }
        } else {
          const created = await api.createCalendarEvent(eventData);
          if (calendarType === 'clients') {
            setClientEvents([...clientEvents, created]);
          } else {
            setCompanyEvents([...companyEvents, created]);
          }
        }
      } else if (modalType === 'client') {
        if (editingItem) {
          const updated = await api.updateClient(editingItem.id, formData);
          setClients(clients.map(c => c.id === editingItem.id ? updated : c));
        } else {
          const created = await api.createClient({
            ...formData,
            projectsCount: 0,
            totalBudget: 0
          });
          setClients([...clients, created]);
        }
      }
      
      closeModal();
      console.log('✅ Datos guardados correctamente');
    } catch (error) {
      console.error('❌ Error guardando:', error);
      alert('Error al guardar los datos. Por favor, inténtalo de nuevo.');
    }
  };

  // Funciones de eliminación
  const handleDeleteProject = async (id) => {
    if (window.confirm(t.confirmDelete)) {
      try {
        await api.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
        console.log('✅ Proyecto eliminado');
      } catch (error) {
        console.error('❌ Error eliminando proyecto:', error);
        alert('Error al eliminar el proyecto');
      }
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm(t.confirmDelete)) {
      try {
        await api.deleteClient(id);
        setClients(clients.filter(c => c.id !== id));
        console.log('✅ Cliente eliminado');
      } catch (error) {
        console.error('❌ Error eliminando cliente:', error);
        alert('Error al eliminar el cliente');
      }
    }
  };

  const handleDeleteInventory = async (id) => {
    if (window.confirm(t.confirmDelete)) {
      try {
        await api.deleteInventoryItem(id);
        setInventoryItems(inventoryItems.filter(i => i.id !== id));
        console.log('✅ Item eliminado');
      } catch (error) {
        console.error('❌ Error eliminando item:', error);
        alert('Error al eliminar el item');
      }
    }
  };

  const handleDeleteInvestment = async (id) => {
    if (window.confirm(t.confirmDelete)) {
      try {
        await api.deleteInvestment(id);
        setInvestments(investments.filter(i => i.id !== id));
        console.log('✅ Inversión eliminada');
      } catch (error) {
        console.error('❌ Error eliminando inversión:', error);
        alert('Error al eliminar la inversión');
      }
    }
  };

  const handleDeleteCalendarEvent = async (id) => {
    if (window.confirm(t.confirmDelete)) {
      try {
        await api.deleteCalendarEvent(id);
        if (activeCalendar === 'clients') {
          setClientEvents(clientEvents.filter(e => e.id !== id));
        } else {
          setCompanyEvents(companyEvents.filter(e => e.id !== id));
        }
        console.log('✅ Evento eliminado');
      } catch (error) {
        console.error('❌ Error eliminando evento:', error);
        alert('Error al eliminar el evento');
      }
    }
  };

  // Props compartidos para todas las vistas
  const sharedProps = {
    darkMode,
    t,
    projects,
    setProjects,
    clients,
    setClients,
    inventoryItems,
    setInventoryItems,
    investments,
    setInvestments,
    clientEvents,
    setClientEvents,
    companyEvents,
    setCompanyEvents,
    setShowModal,
    setModalType,
    setEditingItem,
    setFormData,
    onDeleteProject: handleDeleteProject,
    onDeleteClient: handleDeleteClient,
    onDeleteInventory: handleDeleteInventory,
    onDeleteInvestment: handleDeleteInvestment,
    onDeleteCalendarEvent: handleDeleteCalendarEvent
  };

  // Mostrar indicador de carga
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
          : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Cargando datos...
          </p>
        </div>
      </div>
    );
  }

  // Mostrar error si ocurre
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
          : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50'
      }`}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {error}
          </p>
          <button
            onClick={loadAllData}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
        : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50'
    }`}>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
          darkMode={darkMode}
          t={t}
        />

        {/* Contenido Principal */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && <DashboardView {...sharedProps} />}
          {activeTab === 'projects' && <ProjectsView {...sharedProps} />}
          {activeTab === 'clients' && <ClientsView {...sharedProps} />}
          {activeTab === 'calendar' && (
            <CalendarView
              {...sharedProps}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              activeCalendar={activeCalendar}
              setActiveCalendar={setActiveCalendar}
            />
          )}
          {activeTab === 'financial' && <FinancialView {...sharedProps} />}
          {activeTab === 'inventory' && <InventoryView {...sharedProps} />}
        </div>
      </div>

      {/* Modal */}
      <Modal
        showModal={showModal}
        modalType={modalType}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        darkMode={darkMode}
        t={t}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};