import { NextRequest } from 'next/server';

// Types
interface AuthState {
  [x: string]: any;
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
}

// Create a global auth state
let authState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

export function getAuthState() {
  return authState;
}

export function setAuthState(state: Partial<AuthState>) {
  authState = { ...authState, ...state };
}

// Removed duplicate clearAuthState function to resolve identifier conflict

// Removed duplicate handleLoginSuccess function to resolve identifier conflict

export const handleLoginSuccess = async (data: any) => {
  // Store the token in localStorage
  localStorage.setItem("token", data.token);
  // Store any other necessary user data
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const getClientAuthState = () => {
  if (typeof window === "undefined") return { isAuthenticated: false };

  const token = localStorage.getItem("token");
  return {
    isAuthenticated: !!token,
    token,
  };
};

export const clearAuthState = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};