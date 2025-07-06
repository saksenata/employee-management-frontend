"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import withAuth from '@/components/withAuth/withAuth';
import Layout from '@/components/Layout/Layout';
import InventoryForm from '@/components/InventoryForm/InventoryForm';
import { getInventoryById } from '@/services/inventoryService';

interface Inventory {
  id: string;
  name: string;
  code: string;
  description: string;
  stockQuantity: number;
  image: string;
}

function EditInventoryPage() {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const inventoryId = params.id as string;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventoryById(inventoryId);
        setInventory(data);
      } catch (err) {
        setError('Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };

    if (inventoryId) {
      fetchInventory();
    }
  }, [inventoryId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading inventory...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !inventory) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-red-600">{error || 'Inventory not found'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <InventoryForm mode="edit" inventory={inventory} inventoryId={inventoryId} />
    </Layout>
  );
}

export default withAuth(EditInventoryPage); 