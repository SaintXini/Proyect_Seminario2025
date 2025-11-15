import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==================== AUTENTICACIÓN ====================
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    if (response.data.user) {
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = () => {
  sessionStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// ==================== PROYECTOS ====================
export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== CLIENTES ====================
export const getClients = async () => {
  try {
    const response = await api.get('/clients');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await api.post('/clients', clientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== INVENTARIO ====================
export const getInventory = async () => {
  try {
    const response = await api.get('/inventory');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createInventoryItem = async (itemData) => {
  try {
    const response = await api.post('/inventory', itemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateInventoryItem = async (id, itemData) => {
  try {
    const response = await api.put(`/inventory/${id}`, itemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteInventoryItem = async (id) => {
  try {
    const response = await api.delete(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== INVERSIONES ====================
export const getInvestments = async () => {
  try {
    const response = await api.get('/investments');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createInvestment = async (investmentData) => {
  try {
    const response = await api.post('/investments', investmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateInvestment = async (id, investmentData) => {
  try {
    const response = await api.put(`/investments/${id}`, investmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteInvestment = async (id) => {
  try {
    const response = await api.delete(`/investments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== NOTIFICACIONES ====================
export const getNotifications = async (userId = null) => {
  try {
    const params = userId ? { user_id: userId } : {};
    const response = await api.get('/notifications', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createNotification = async (notificationData) => {
  try {
    const response = await api.post('/notifications', notificationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== SOLICITUDES ====================
export const getRequests = async () => {
  try {
    const response = await api.get('/requests');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createRequest = async (requestData) => {
  try {
    const response = await api.post('/requests', requestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateRequest = async (id, requestData) => {
  try {
    const response = await api.put(`/requests/${id}`, requestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== CALENDARIO ====================
export const getCalendarEvents = async (type, month, year) => {
  try {
    const params = { type };
    if (month) params.month = month;
    if (year) params.year = year;
    const response = await api.get('/calendar/events', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createCalendarEvent = async (eventData) => {
  try {
    const response = await api.post('/calendar/events', eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateCalendarEvent = async (id, eventData) => {
  try {
    const response = await api.put(`/calendar/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteCalendarEvent = async (id) => {
  try {
    const response = await api.delete(`/calendar/events/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== HEALTH CHECK ====================
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default api;