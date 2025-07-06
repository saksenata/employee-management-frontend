"use client";

import { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { checkToken } from '@/services/authService';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick?: () => void;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { logout, isInitializing } = useAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    logout();
  };

  useEffect(() => {
    const getCurrentUserData = () => {
      if (!isInitializing) {
        try {
          // Try to get user data from localStorage first
          const savedUser = localStorage.getItem('currentUser');
          if (savedUser) {
            const userData = JSON.parse(savedUser);
            setCurrentUser(userData);
            return;
          }
          
          // Fallback to API call if no saved data
          const fetchCurrentUser = async () => {
            try {
              setLoading(true);
              const data = await checkToken();
              if (data.status === 200 && data.result) {
                setCurrentUser(data.result);
                // Save to localStorage for future use
                localStorage.setItem('currentUser', JSON.stringify(data.result));
              }
            } catch (error) {
              console.error('Failed to fetch current user:', error);
            } finally {
              setLoading(false);
            }
          };
          
          fetchCurrentUser();
        } catch (error) {
          console.error('Failed to get current user:', error);
        }
      }
    };

    getCurrentUserData();
  }, [isInitializing]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  if (isInitializing) {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 mr-2 hover:bg-gray-100 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl">Dashboard</h1>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 mr-2 hover:bg-gray-100 rounded"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {currentUser && (
          <div className="relative user-dropdown">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <span>{currentUser.name}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href={`/users/${currentUser.id}/change-password`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Change Password
                </Link>
              </div>
            )}
          </div>
        )}
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
}