import { NextRequest } from 'next/server';

// Types
interface AuthState {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
}

// Create a global auth state
let authState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true
};

export function getAuthState() {
  return authState;
}

export function setAuthState(state: Partial<AuthState>) {
  authState = { ...authState, ...state };
}

export function clearAuthState() {
  authState = {
    isAuthenticated: false,
    user: null,
    loading: false
  };
}

export async function handleLoginSuccess(data: any) {
  // Update auth state
  setAuthState({
    isAuthenticated: true,
    user: data.user,
    loading: false
  });
  
  // Store in localStorage as backup
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
}
