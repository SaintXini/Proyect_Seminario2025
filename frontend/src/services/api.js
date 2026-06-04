import axios from 'axios';

// Usar localhost en desarrollo, URL de producción en producción
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag para evitar ciclos infinitos de refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor para agregar token JWT a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globalmente y renovar token si es necesario
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        // No hay refresh token, limpiar y redirigir a login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        
        processQueue(null, access_token);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==================== AUTENTICACIÓN ====================
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh');
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/auth/profile', profileData);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
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

// ==================== FINANZAS ====================
export const getFinance = async () => {
  try {
    const response = await api.get('/finance');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getFinanceSummary = async () => {
  try {
    const response = await api.get('/finance/summary');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createFinance = async (financeData) => {
  try {
    const response = await api.post('/finance', financeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateFinance = async (id, financeData) => {
  try {
    const response = await api.put(`/finance/${id}`, financeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteFinance = async (id) => {
  try {
    const response = await api.delete(`/finance/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== REUNIONES ====================
export const getMeetings = async () => {
  try {
    const response = await api.get('/meetings');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMeetingsByUser = async (userId) => {
  try {
    const response = await api.get(`/meetings/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createMeeting = async (meetingData) => {
  try {
    const response = await api.post('/meetings', meetingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateMeeting = async (id, meetingData) => {
  try {
    const response = await api.put(`/meetings/${id}`, meetingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteMeeting = async (id) => {
  try {
    const response = await api.delete(`/meetings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==================== RECOMENDACIONES ====================
export const getRecommendations = async () => {
  try {
    const response = await api.get('/recommendations');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getActiveRecommendations = async () => {
  try {
    const response = await api.get('/recommendations/active');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createRecommendation = async (recommendationData) => {
  try {
    const response = await api.post('/recommendations', recommendationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateRecommendation = async (id, recommendationData) => {
  try {
    const response = await api.put(`/recommendations/${id}`, recommendationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteRecommendation = async (id) => {
  try {
    const response = await api.delete(`/recommendations/${id}`);
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