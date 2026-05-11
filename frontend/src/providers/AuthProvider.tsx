"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/axios';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, clearAuth, setAuth, isAuthenticated } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await api.get('/me');
          // Re-sync user data
          setAuth(response.data.data, token);
        } catch (error) {
          console.error('Auth verification failed', error);
          clearAuth();
        }
      }
      setIsReady(true);
    };

    checkAuth();
  }, [token, clearAuth, setAuth]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
