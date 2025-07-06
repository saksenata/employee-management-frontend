"use client";

import withAuth from '@/components/withAuth/withAuth';
import Layout from '@/components/Layout/Layout';
import InventoryForm from '@/components/InventoryForm/InventoryForm';

function AddInventoryPage() {
  return (
    <Layout>
      <InventoryForm mode="add" />
    </Layout>
  );
}

export default withAuth(AddInventoryPage); 