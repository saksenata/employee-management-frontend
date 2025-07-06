import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { checkToken, refreshToken, logout } from '@/services/authService';
import Cookies from 'js-cookie';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    setIsLoggingOut(true);
    logout();
    setIsAuthenticated(false);
    setIsInitializing(false);
    router.push('/login');
  }, [router]);

  // Auto logout after inactivity (30 minutes) - only when fully authenticated
  useEffect(() => {
    if (!isAuthenticated || isLoggingOut || isInitializing) return;

    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        handleLogout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Reset timer on user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Start the timer
    resetTimer();

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [isAuthenticated, isLoggingOut, isInitializing, handleLogout]);

  useEffect(() => {
    if (isLoggingOut) return;

    const verifyToken = async () => {
      const token = Cookies.get('accessToken');
      
      if (token) {
        try {
          await checkToken();
          setIsAuthenticated(true);
          setIsInitializing(false);
        } catch (error) {
          try {
            await refreshToken();
            setIsAuthenticated(true);
            setIsInitializing(false);
          } catch (refreshError) {
            handleLogout();
          }
        }
      } else {
        setIsAuthenticated(false);
        setIsInitializing(false);
      }
    };

    const timer = setTimeout(() => {
      verifyToken();
    }, 100);

    return () => clearTimeout(timer);
  }, [router, isLoggingOut, handleLogout]);

  return { isAuthenticated, logout: handleLogout, isInitializing };
}