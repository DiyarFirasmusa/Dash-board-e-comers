export const Base_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';
export interface ErrorResponse {
  Detail: string,
}
