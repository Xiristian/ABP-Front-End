export const API_URI = "http://localhost:3000/api";

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
