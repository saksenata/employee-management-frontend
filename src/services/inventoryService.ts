import Cookies from 'js-cookie';
import { refreshToken } from '@/services/authService';

const getAuthHeaders = async () => {
  let token = Cookies.get('accessToken');
  
  if (!token) {
    throw new Error('No access token available');
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

const getAuthHeadersForFormData = async () => {
  let token = Cookies.get('accessToken');
  
  if (!token) {
    throw new Error('No access token available');
  }

  return {
    'Authorization': `Bearer ${token}`,
  };
};

// Helper function to make authenticated requests with token refresh
const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Token expired, try to refresh
      await refreshToken();
      const newHeaders = await getAuthHeaders();
      
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...newHeaders,
          ...options.headers,
        },
      });

      if (!retryResponse.ok) {
        const errorData = await retryResponse.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      return retryResponse;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return response;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

export const getInventories = async () => {
  const response = await makeAuthenticatedRequest('https://api.nanspace.top/api/inventories?page=1&limit=10');
  const data = await response.json();
  
  // Transform image paths to full URLs
  if (data.result && Array.isArray(data.result)) {
    data.result = data.result.map((item: any) => {
      // The API returns paths like "inventories/filename.jpg", so we need to use /storage/
      const imageUrl = item.image 
        ? `https://api.nanspace.top/storage/${item.image}` 
        : null;
      return {
        ...item,
        image: imageUrl,
      };
    });
  }
  
  return data;
};

export const createInventory = async (data: any, file?: File) => {
  if (file) {
    // Use FormData for file upload
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('code', data.code);
    formData.append('description', data.description);
    formData.append('stockQuantity', data.stockQuantity.toString());
    formData.append('image', file);

    const headers = await getAuthHeadersForFormData();
    const response = await fetch('https://api.nanspace.top/api/inventories', {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
  } else {
    // Use JSON for text-only data
    const response = await makeAuthenticatedRequest('https://api.nanspace.top/api/inventories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
};

export const getInventoryById = async (id: string) => {
  const response = await makeAuthenticatedRequest(`https://api.nanspace.top/api/inventories/${id}`);
  const data = await response.json();
  
  // Return the inventory data in the expected format with proper image URL
  if (data.result) {
    // The API returns paths like "inventories/filename.jpg", so we need to use /storage/
    const imageUrl = data.result.image 
      ? `https://api.nanspace.top/storage/${data.result.image}` 
      : '';
    return {
      ...data.result,
      image: imageUrl,
    };
  }
  
  return data;
};

export const updateInventory = async (id: string, data: any, file?: File) => {
  if (file) {
    // Use FormData for file upload
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('code', data.code);
    formData.append('description', data.description);
    formData.append('stockQuantity', data.stockQuantity.toString());
    formData.append('image', file);

    const headers = await getAuthHeadersForFormData();
    const response = await fetch(`https://api.nanspace.top/api/inventories/${id}`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
  } else {
    // Use JSON for text-only data
    const response = await makeAuthenticatedRequest(`https://api.nanspace.top/api/inventories/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
};

export const deleteInventory = async (id: string) => {
  const response = await makeAuthenticatedRequest(`https://api.nanspace.top/api/inventories/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};