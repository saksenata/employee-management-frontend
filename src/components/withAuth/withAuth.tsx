"use client";

import useAuth from '@/hooks/useAuth';
import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const AuthComponent = (props: P) => {
    const { isAuthenticated, isInitializing } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Only redirect if we're not initializing and not authenticated
      if (!isInitializing && isAuthenticated === false) {
        router.push('/login');
      }
    }, [isAuthenticated, isInitializing, router]);

    // Show loading while initializing
    if (isInitializing || isAuthenticated === null) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Show loading if not authenticated
    if (isAuthenticated === false) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
}