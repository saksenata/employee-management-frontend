import apiClient from './api'; // Use the centralized apiClient

// Function to get all employees with optional query parameters
export const getEmployees = async (params = {}) => {
  // params could be { page: 1, limit: 10, status: 'AKTIF', search: 'John' }
  try {
    const response = await apiClient.get('/', { params });
    return response.data; // Assuming backend returns { success: true, data: { employees: [], totalPages: ... } }
  } catch (error) {
    console.error('Error fetching employees:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data; // Assuming backend returns { success: true, data: employeeObject }
  } catch (error) {
    console.error(`Error fetching employee ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// employeeData should be a FormData object if a file is included
export const createEmployee = async (formData) => {
  try {
    const response = await apiClient.post('/', formData, {
      headers: {
        // Let Axios set Content-Type for FormData, it includes boundary
        // 'Content-Type': 'multipart/form-data', // Not needed if formData is a FormData object
      },
    });
    return response.data; // Assuming backend returns { success: true, message: '...', data: newEmployee }
  } catch (error) {
    console.error('Error creating employee:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// employeeData should be a FormData object if a file is included
export const updateEmployee = async (id, formData) => {
  try {
    const response = await apiClient.put(`/${id}`, formData, {
      headers: {
        // Let Axios set Content-Type for FormData
        // 'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Assuming backend returns { success: true, message: '...', data: updatedEmployee }
  } catch (error) {
    console.error(`Error updating employee ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data; // Assuming backend returns { success: true, message: '...' }
  } catch (error) {
    console.error(`Error deleting employee ${id}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};