"use client";

import useAuth from '@/hooks/useAuth';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { logout, isInitializing } = useAuth();

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
      <button
        onClick={logout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </header>
  );
}