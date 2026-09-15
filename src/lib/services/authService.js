/**
 * Example auth service — demonstrates the UI ↔ service boundary.
 * Replace with real endpoints; keep method signatures stable for features.
 */
import { apiClient } from './apiClient';
export const authService = {
  login: (payload) => apiClient.post('/auth/login', payload),
  logout: () => apiClient.post('/auth/logout'),
  me: () => apiClient.get('/auth/me'),
};
