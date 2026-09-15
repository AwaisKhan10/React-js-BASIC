/**
 * Thin HTTP client wrapper — UI never calls fetch directly.
 * Swap implementation later (axios, ky, generated OpenAPI client) without
 * touching feature components; only services that import apiClient change.
 */
import { env } from '@/config';
export class ApiError extends Error {
  status;
  body;
  constructor(message, status, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}
function buildUrl(path, query) {
  const base = env.apiBaseUrl.replace(/\/$/, '');
  const url = new URL(
    path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`,
  );
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}
async function request(path, options = {}) {
  const { body, query, headers, ...rest } = options;
  const response = await fetch(buildUrl(path, query), {
    ...rest,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new ApiError(`Request failed: ${response.status}`, response.status, data);
  }
  return data;
}
export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
