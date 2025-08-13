import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm from '../../components/EmployeeForm';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';
import { Container, Alert, Spinner } from 'react-bootstrap';
import './EditEmployee.scss'; // Styles for the page container if any

// Helper to format date for input type="date"
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  // Assuming dateString is YYYY-MM-DD or a full ISO string
  return new Date(dateString).toISOString().split('T')[0];
};

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getEmployeeById(id);
        if (response.success && response.data) {
          const employeeData = response.data;
          // Format dates for form inputs and handle nulls
          setInitialValues({
            ...employeeData,
            birthDate: formatDateForInput(employeeData.birthDate),
            contractStartDate: formatDateForInput(employeeData.contractStartDate),
            contractEndDate: formatDateForInput(employeeData.contractEndDate),
            photo: null, // Photo will be handled separately by EmployeeForm for preview/upload
            // Ensure all fields expected by the form are present, even if null/empty
            password: '', // Password should be empty by default in edit mode
          });
        } else {
          throw new Error(response.message || 'Karyawan tidak ditemukan.');
        }
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError(err.message || 'Gagal mengambil data karyawan.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setFormSubmitLoading(true);
    setError(null);
    const formData = new FormData();

    for (const key in values) {
      // Do not append password if it's empty (meaning user doesn't want to change it)
      if (key === 'password' && !values[key]) {
        continue;
      }
      // If photo is null and it was not changed, don't send it.
      // If photo is a File object, it means a new photo is uploaded.
      // If photoPath is present and photo is null, it means user might want to remove photo (handled by backend if photoPath is set to empty/null)
      if (key === 'photo' && !values[key] && initialValues.photoPath) {
        // To remove photo, we might need a specific flag or ensure backend handles empty photoPath as removal
        // For now, if no new photo, don't append 'photo' field.
        // If you want to explicitly signal photo removal, you might append `photo: ''` or a special value.
        // Or, if `values.photoPath` is explicitly set to null by user interaction (e.g. a "remove photo" button)
        if (values.photoPath === null) formData.append('photoPath', ''); // Signal removal
        continue;
      }


      if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
        formData.append(key, values[key]);
      }
    }
    // If photo was not changed and there was an existing photoPath, we don't need to send it again unless it's being cleared.
    // The backend should ideally only update fields that are present in the request.

    try {
      const response = await updateEmployee(id, formData);
      if (response.success) {
        navigate('/', { state: { message: 'Data karyawan berhasil diperbarui!' } });
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        setError(response.message || 'Gagal memperbarui data karyawan.');
      }
    } catch (err) {
      console.error('Error updating employee:', err);
      const errorMessage = err.errors ? 'Data tidak valid, periksa kembali isian Anda.' : (err.message || 'Terjadi kesalahan. Silakan coba lagi.');
       if(err.errors) {
        setErrors(err.errors);
      }
      setError(errorMessage);
    } finally {
      setSubmitting(false);
      setFormSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error && !initialValues) { // Show error if initial fetch failed
    return (
        <Container className="mt-4">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );
  }


  if (!initialValues) return null; // Should be covered by loading or error state

  return (
    <Container fluid className="edit-employee-page p-4">
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      <EmployeeForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isEditMode={true}
        loading={formSubmitLoading}
      />
    </Container>
  );
};

export default EditEmployee;