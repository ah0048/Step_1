// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5184/api',
  
  // Auth
  AUTH_LOGIN: import.meta.env.VITE_API_AUTH_LOGIN || 'http://localhost:5184/api/Auth/login',
  AUTH_REGISTER: import.meta.env.VITE_API_AUTH_REGISTER || 'http://localhost:5184/api/Auth/register',
  
  // Trainer
  TRAINER_ALL: import.meta.env.VITE_API_TRAINER_ALL || 'http://localhost:5184/api/Trainer/all',
  TRAINER_ADD: import.meta.env.VITE_API_TRAINER_ADD || 'http://localhost:5184/api/Trainer/add',
  TRAINER_EDIT: import.meta.env.VITE_API_TRAINER_EDIT || 'http://localhost:5184/api/Trainer/edit',
  TRAINER_DELETE: import.meta.env.VITE_API_TRAINER_DELETE || 'http://localhost:5184/api/Trainer/delete',
  TRAINER_RATE: import.meta.env.VITE_API_TRAINER_RATE || 'http://localhost:5184/api/Trainer/rate',
  
  // Package
  PACKAGE_ALL: import.meta.env.VITE_API_PACKAGE_ALL || 'http://localhost:5184/api/Package/all',
  PACKAGE_ADD: import.meta.env.VITE_API_PACKAGE_ADD || 'http://localhost:5184/api/Package/add',
  PACKAGE_EDIT: import.meta.env.VITE_API_PACKAGE_EDIT || 'http://localhost:5184/api/Package/edit',
  PACKAGE_DELETE: import.meta.env.VITE_API_PACKAGE_DELETE || 'http://localhost:5184/api/Package/delete',
  PACKAGE_PLACE_ORDER: import.meta.env.VITE_API_PACKAGE_PLACE_ORDER || 'http://localhost:5184/api/Package/place-order',
  
  // Dashboard
  DASHBOARD: import.meta.env.VITE_API_DASHBOARD || 'http://localhost:5184/api/Dashboard',
  
  // Reservation
  RESERVATION_ADD: import.meta.env.VITE_API_RESERVATION_ADD || 'http://localhost:5184/api/Reservation/add'
};

export default API_CONFIG;
