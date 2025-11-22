export interface Member {
  id: string; // UUID
  fullName: string;
  designation: string;
  membershipId: string; // Unique human readable ID
  wing: string;
  expiryDate: string;
  cardImage?: string; // Base64 string
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

export const CONSTANTS = {
  STORAGE_KEY: 'flyo_members_data',
  AUTH_KEY: 'flyo_auth_session',
  ADMIN_EMAIL: 'info@flyo.com.pk',
  ADMIN_PASS: 'KTr@34865115'
};