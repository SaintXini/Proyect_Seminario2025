// src/components/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { translations } from './admin/data/translations';
import { 
  initialProjects, 
  initialClientEvents, 
  initialCompanyEvents,
  initialInventoryItems,
  initialInvestments,
  initialClients 
} from './admin/data/initialData';

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
  const [projects, setProjects] = useState(initialProjects);
  const [clientEvents, setClientEvents] = useState(initialClientEvents);
  const [companyEvents, setCompanyEvents] = useState(initialCompanyEvents);
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [investments, setInvestments] = useState(initialInvestments);
  const [clients, setClients] = useState(initialClients);

  // Traducciones
  const t = translations[language] || translations.es;

  // Funciones del modal
  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
    setFormData({});
  };

  const handleSave = () => {
    if (modalType === 'project') {
      if (editingItem) {
        setProjects(projects.map(p => p.id === editingItem.id ? { ...formData, id: editingItem.id } : p));
      } else {
        setProjects([...projects, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'inventory') {
      if (editingItem) {
        setInventoryItems(inventoryItems.map(i => i.id === editingItem.id ? { ...formData, id: editingItem.id } : i));
      } else {
        setInventoryItems([...inventoryItems, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'investment') {
      if (editingItem) {
        setInvestments(investments.map(i => i.id === editingItem.id ? { ...formData, id: editingItem.id } : i));
      } else {
        setInvestments([...investments, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'clientEvent') {
      if (editingItem) {
        setClientEvents(clientEvents.map(e => e.id === editingItem.id ? { ...formData, id: editingItem.id } : e));
      } else {
        setClientEvents([...clientEvents, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'companyEvent') {
      if (editingItem) {
        setCompanyEvents(companyEvents.map(e => e.id === editingItem.id ? { ...formData, id: editingItem.id } : e));
      } else {
        setCompanyEvents([...companyEvents, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'client') {
      if (editingItem) {
        setClients(clients.map(c => c.id === editingItem.id ? { ...formData, id: editingItem.id } : c));
      } else {
        setClients([...clients, { ...formData, id: Date.now(), projectsCount: 0, totalBudget: 0 }]);
      }
    }
    closeModal();
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
    setFormData
  };

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