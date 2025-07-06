"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import withAuth from '@/components/withAuth/withAuth';
import Layout from '@/components/Layout/Layout';
import UserForm from '@/components/UserForm/UserForm';
import { getUserById } from '@/services/userService';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

function EditUserPage() {
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        // getUserById returns the user data directly, not wrapped in status/result
        setUser(data);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading user...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-600">{error}</div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="text-gray-600">User not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <UserForm mode="edit" user={user} userId={userId} />
    </Layout>
  );
}

export default withAuth(EditUserPage); 