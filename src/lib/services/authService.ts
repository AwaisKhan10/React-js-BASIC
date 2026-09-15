/**
 * Example auth service — demonstrates the UI ↔ service boundary.
 * Replace with real endpoints; keep method signatures stable for features.
 */

import { apiClient } from './apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  login: (payload: LoginPayload) => apiClient.post<AuthUser>('/auth/login', payload),
  logout: () => apiClient.post<void>('/auth/logout'),
  me: () => apiClient.get<AuthUser>('/auth/me'),
};
