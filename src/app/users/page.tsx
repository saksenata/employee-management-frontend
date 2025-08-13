"use client";

import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth/withAuth';
import Layout from '@/components/Layout/Layout';
import { getUsers, deleteUser } from '@/services/userService';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import Alert from '@/components/Alert/Alert';
import AuthenticatedImage from '@/components/AuthenticatedImage/AuthenticatedImage';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        if (data.status === 200) {
          setUsers(data.result);
        } else {
          setError('Failed to fetch users');
        }
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    
    setDeletingId(itemToDelete.id);
    try {
      await deleteUser(itemToDelete.id);
      // Refresh the list after successful deletion
      const data = await getUsers();
      if (data.status === 200) {
        setUsers(data.result);
      }
    } catch (err) {
      alert('Failed to delete user');
    } finally {
      setDeletingId(null);
    }
  };

  if (isInitializing) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return <Layout><div>Loading users...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="text-red-600">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          href="/users/add"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          +
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left hidden md:table-cell">Email</th>
              <th className="py-2 px-4 border-b text-left hidden sm:table-cell">Image</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b font-medium">{user.name}</td>
                  <td className="py-2 px-4 border-b hidden md:table-cell">{user.email}</td>
                  <td className="py-2 px-4 border-b hidden sm:table-cell">
                    {user.image ? (
                      <AuthenticatedImage
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 object-cover rounded"
                        fallback={
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                            No img
                          </div>
                        }
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/users/${user.id}/edit`}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(user.id, user.name)}
                        disabled={deletingId === user.id}
                        className="text-red-500 hover:underline disabled:opacity-50 text-sm"
                      >
                        {deletingId === user.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Alert
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Layout>
  );
}

export default withAuth(UsersPage);