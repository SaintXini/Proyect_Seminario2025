// src/data/initialData.js

export const initialProjects = [
  { id: 1, name: 'Documental Institucional', status: 'En progreso', progress: 65, budget: 25000, client: 'Universidad Nacional' },
  { id: 2, name: 'Video Corporativo', status: 'En progreso', progress: 40, budget: 15000, client: 'TechCorp' },
  { id: 3, name: 'Cápsula Educativa', status: 'Planificación', progress: 20, budget: 8000, client: 'Ministerio de Educación' }
];

export const initialClientEvents = [
  { id: 1, date: 5, title: 'Grabación Cliente A', type: 'production', client: 'Universidad Nacional' },
  { id: 2, date: 8, title: 'Sesión Fotos TechCorp', type: 'production', client: 'TechCorp' },
  { id: 3, date: 15, title: 'Entrega Proyecto A', type: 'deadline', client: 'Universidad Nacional' },
  { id: 4, date: 22, title: 'Presentación Cliente B', type: 'meeting', client: 'Ministerio de Educación' }
];

export const initialCompanyEvents = [
  { id: 5, date: 12, title: 'Mantenimiento Equipos', type: 'maintenance' },
  { id: 6, date: 18, title: 'Capacitación Personal', type: 'training' },
  { id: 7, date: 25, title: 'Reunión de Equipo', type: 'meeting' },
  { id: 8, date: 28, title: 'Planificación Mensual', type: 'planning' }
];

export const initialInventoryItems = [
  { id: 1, name: 'Cámara Sony A7III', category: 'Cámaras', status: 'Disponible', lastMaintenance: '2025-01-15', quantity: 1 },
  { id: 2, name: 'Kit de Iluminación LED', category: 'Iluminación', status: 'En uso', borrower: 'Proyecto Documental', quantity: 1 },
  { id: 3, name: 'Micrófono Shotgun', category: 'Audio', status: 'Disponible', lastMaintenance: '2025-01-10', quantity: 2 },
  { id: 4, name: 'Trípode Manfrotto', category: 'Accesorios', status: 'Mantenimiento', expectedReturn: '2025-02-01', quantity: 1 },
  { id: 5, name: 'Baterías NPF', category: 'Consumibles', status: 'Stock bajo', quantity: 8 }
];

export const initialInvestments = [
  { id: 1, item: 'Sistema de Audio Profesional', priority: 'Alta', estimated: 5000, notes: 'Necesario para mejorar calidad' },
  { id: 2, item: 'Drone DJI Mini 3 Pro', priority: 'Media', estimated: 3500, notes: 'Para tomas aéreas' },
  { id: 3, item: 'Estabilizador Gimbal', priority: 'Media', estimated: 1800, notes: 'Reemplazo de equipo antiguo' }
];

export const initialClients = [
  { id: 1, name: 'Universidad Nacional', contact: 'Dr. Carlos Méndez', email: 'cmendez@uni.edu.gt', phone: '+502 2345-6789', status: 'Activo', projectsCount: 1, totalBudget: 25000, since: '2024-01' },
  { id: 2, name: 'TechCorp', contact: 'Ana Rodríguez', email: 'ana.r@techcorp.com', phone: '+502 3456-7890', status: 'Activo', projectsCount: 1, totalBudget: 15000, since: '2024-03' },
  { id: 3, name: 'Ministerio de Educación', contact: 'Lic. Roberto García', email: 'rgarcia@mineduc.gob.gt', phone: '+502 4567-8901', status: 'Activo', projectsCount: 1, totalBudget: 8000, since: '2024-02' },
  { id: 4, name: 'Banco Industrial', contact: 'María López', email: 'mlopez@bi.com.gt', phone: '+502 5678-9012', status: 'Inactivo', projectsCount: 0, totalBudget: 0, since: '2023-11' }
];