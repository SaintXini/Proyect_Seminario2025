import React, { useState } from 'react';
import Header from './cliente/Header';
import Sidebar from './cliente/Sidebar';
import Modal from './cliente/Modal';
import DashboardSection from './cliente/DashboardSection';
import NewProjectSection from './cliente/NewProjectSection';
import CalendarSection from './cliente/CalendarSection';
import MeetingsSection from './cliente/MeetingsSection';
import HistorySection from './cliente/HistorySection';
import ProfileSection from './cliente/ProfileSection';
import { NewProjectModal, EditProjectModal, NewRequestModal } from './cliente/ModalContent';
import { dashboardTranslations } from './cliente/data/translations';
import { getMenuItems } from './cliente/data/constants';
import { initialActiveProjects, initialProjectHistory } from './cliente/data/mockData';

const ClientDashboard = ({ darkMode, language, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [activeProjectsList, setActiveProjectsList] = useState(initialActiveProjects);
  const [projectHistory, setProjectHistory] = useState(initialProjectHistory);
  
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
  const menuItems = getMenuItems(t);

  // Handler para enviar nuevo proyecto
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

  // Handler para actualizar proyecto existente
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
    setNewProjectForm({ name: '', type: 'institutional', description: '', deliveryDate: '' });
  };

  // Handler para enviar solicitud
  const handleSubmitRequest = () => {
    if (!requestForm.details) {
      alert(language === 'es' ? 'Por favor describe tu solicitud' : 'Please describe your request');
      return;
    }
    alert(`${language === 'es' ? 'Solicitud enviada exitosamente' : 'Request submitted successfully'}. #${Math.floor(Math.random() * 10000)}`);
    setRequestForm({ type: '', projectId: '', details: '', urgency: 'medium' });
    setShowModal(false);
  };

  const renderSection = () => {
    const commonProps = {
      darkMode,
      language,
      t,
      activeProjectsList,
      setActiveProjectsList,
      newProjectForm,
      setNewProjectForm,
      setShowModal,
      setModalType,
      setSelectedProject,
      requestForm,
      setRequestForm,
      projectHistory,
    };

    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection {...commonProps} />;
      case 'newProject':
        return <NewProjectSection {...commonProps} />;
      case 'calendar':
        return <CalendarSection {...commonProps} />;
      case 'meetings':
        return <MeetingsSection {...commonProps} />;
      case 'history':
        return <HistorySection {...commonProps} />;
      case 'profile':
        return <ProfileSection {...commonProps} />;
      default:
        return <DashboardSection {...commonProps} />;
    }
  };

  // Renderizar contenido del modal según tipo
  const renderModalContent = () => {
    switch (modalType) {
      case 'newProject':
        return (
          <NewProjectModal
            darkMode={darkMode}
            t={t}
            language={language}
            newProjectForm={newProjectForm}
            setNewProjectForm={setNewProjectForm}
            onSubmit={handleSubmitProject}
          />
        );
      case 'editProject':
        return (
          <EditProjectModal
            darkMode={darkMode}
            t={t}
            newProjectForm={newProjectForm}
            setNewProjectForm={setNewProjectForm}
            onUpdate={handleUpdateProject}
          />
        );
      case 'newRequest':
        return (
          <NewRequestModal
            darkMode={darkMode}
            t={t}
            requestForm={requestForm}
            setRequestForm={setRequestForm}
            onSubmit={handleSubmitRequest}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-100 text-gray-900'}`}>
      <Header 
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={onLogout}
        t={t}
      />
      
      <Sidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        menuItems={menuItems}
      />

      <main className={`pt-24 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 p-8`}>
        {renderSection()}
      </main>

      {showModal && (
        <Modal darkMode={darkMode} onClose={() => setShowModal(false)}>
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
};

export default ClientDashboard;