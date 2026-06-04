import React, { useState, useEffect, useCallback } from 'react';
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
import * as api from '../services/api';

const ClientDashboard = ({ darkMode, language, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [activeProjectsList, setActiveProjectsList] = useState([]);
  const [projectHistory, setProjectHistory] = useState([]);

  const loadClientData = useCallback(async () => {
    try {
      // Cargar proyectos del backend
      const projectsResponse = await api.getProjects();
      const projects = projectsResponse.projects || projectsResponse;
      setActiveProjectsList(projects.filter(p => p.status !== 'Completado'));
      setProjectHistory(projects.filter(p => p.status === 'Completado'));
    } catch (error) {
      console.error('Error cargando datos del cliente:', error);
      setActiveProjectsList([]);
      setProjectHistory([]);
    }
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadClientData();
  }, [loadClientData]);
  
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
  const handleSubmitProject = async () => {
    if (!newProjectForm.name) {
      alert(language === 'es' ? 'Por favor completa todos los campos' : 'Please complete all fields');
      return;
    }
    try {
      const projectData = {
        name: newProjectForm.name,
        client: 'Cliente',
        description: newProjectForm.description,
        status: 'En progreso',
        progress: 0,
        budget: 0,
        start_date: new Date().toISOString(),
        end_date: newProjectForm.deliveryDate ? new Date(newProjectForm.deliveryDate).toISOString() : null
      };
      
      const response = await api.createProject(projectData);
      setActiveProjectsList([...activeProjectsList, response.project || response]);
      alert(language === 'es' ? 'Proyecto creado exitosamente' : 'Project created successfully');
      setNewProjectForm({ name: '', type: 'institutional', description: '', deliveryDate: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error creando proyecto:', error);
      alert(language === 'es' ? 'Error al crear el proyecto' : 'Error creating project');
    }
  };

  // Handler para actualizar proyecto existente
  const handleUpdateProject = async () => {
    if (!newProjectForm.name) {
      alert(language === 'es' ? 'Por favor completa todos los campos' : 'Please complete all fields');
      return;
    }
    try {
      const projectData = {
        name: newProjectForm.name,
        description: newProjectForm.description,
        end_date: newProjectForm.deliveryDate ? new Date(newProjectForm.deliveryDate).toISOString() : null
      };
      
      const response = await api.updateProject(selectedProject.id, projectData);
      const updatedProjects = activeProjectsList.map(p =>
        p.id === selectedProject.id ? (response.project || response) : p
      );
      setActiveProjectsList(updatedProjects);
      alert(language === 'es' ? 'Proyecto actualizado exitosamente' : 'Project updated successfully');
      setShowModal(false);
      setSelectedProject(null);
      setNewProjectForm({ name: '', type: 'institutional', description: '', deliveryDate: '' });
    } catch (error) {
      console.error('Error actualizando proyecto:', error);
      alert(language === 'es' ? 'Error al actualizar el proyecto' : 'Error updating project');
    }
  };

  // Handler para enviar solicitud
  const handleSubmitRequest = async () => {
    if (!requestForm.details) {
      alert(language === 'es' ? 'Por favor describe tu solicitud' : 'Please describe your request');
      return;
    }
    try {
      const investmentData = {
        item: requestForm.type || 'Solicitud',
        notes: requestForm.details,
        priority: requestForm.urgency === 'high' ? 'Alta' : requestForm.urgency === 'low' ? 'Baja' : 'Media',
        status: 'Pendiente'
      };
      
      await api.createInvestment(investmentData);
      alert(language === 'es' ? 'Solicitud enviada exitosamente' : 'Request submitted successfully');
      setRequestForm({ type: '', projectId: '', details: '', urgency: 'medium' });
      setShowModal(false);
    } catch (error) {
      console.error('Error enviando solicitud:', error);
      alert(language === 'es' ? 'Error al enviar la solicitud' : 'Error submitting request');
    }
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