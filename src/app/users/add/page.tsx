"use client";

import withAuth from '@/components/withAuth/withAuth';
import Layout from '@/components/Layout/Layout';
import UserForm from '@/components/UserForm/UserForm';

function AddUserPage() {
  return (
    <Layout>
      <UserForm mode="add" />
    </Layout>
  );
}

export default withAuth(AddUserPage); 