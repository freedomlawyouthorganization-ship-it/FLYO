import { CONSTANTS } from '../types';

export const login = (email: string, pass: string): boolean => {
  if (email === CONSTANTS.ADMIN_EMAIL && pass === CONSTANTS.ADMIN_PASS) {
    sessionStorage.setItem(CONSTANTS.AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  sessionStorage.removeItem(CONSTANTS.AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return sessionStorage.getItem(CONSTANTS.AUTH_KEY) === 'true';
};