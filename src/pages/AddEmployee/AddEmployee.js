import React, { useState } from 'react';
import EmployeeForm from '../../components/EmployeeForm';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../services/employeeService';
import { Alert, Container } from 'react-bootstrap'; // Using react-bootstrap Alert
import './AddEmployee.scss'; // Styles for the page container if any

const AddEmployee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    fullName: '',
    nik: '',
    gender: '',
    birthPlace: '',
    birthDate: '', // Should be YYYY-MM-DD for date input
    phoneNumber: '',
    province: '',
    city: '',
    district: '',
    village: '',
    addressDetail: '',
    username: '',
    email: '',
    password: '',
    employeeType: '', // Default to empty or a common type
    // employeeTypeOther: '', // If you have a separate field for "Lainnya"
    contractStartDate: '',
    contractEndDate: '',
    maritalStatus: '',
    bpjsDoctorCode: '',
    status: 'AKTIF', // Default status
    photo: null, // For file upload
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();

    // Append all form values to FormData
    for (const key in values) {
      if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
        // For date fields, ensure they are in the correct format if needed by backend
        // For 'photo', it's a File object
        formData.append(key, values[key]);
      }
    }
    // If employeeType is 'Lainnya_value', it means the actual value is in employeeTypeOther
    // The backend model expects employeeType to hold the final string.
    // The EmployeeForm handles setting values.employeeType to the text input if 'Lainnya' is chosen.

    try {
      const response = await createEmployee(formData);
      if (response.success) {
        navigate('/', { state: { message: 'Karyawan berhasil ditambahkan!' } }); // Pass success message
      } else {
        // Handle specific errors from backend if available
        if (response.errors) {
          setErrors(response.errors); // Set Formik errors
        }
        setError(response.message || 'Gagal menambahkan karyawan.');
      }
    } catch (err) {
      console.error('Error creating employee:', err);
      const errorMessage = err.errors ? 'Data tidak valid, periksa kembali isian Anda.' : (err.message || 'Terjadi kesalahan. Silakan coba lagi.');
      if(err.errors) {
        setErrors(err.errors);
      }
      setError(errorMessage);
    } finally {
      setSubmitting(false); // Formik's own submitting state
      setLoading(false); // Local loading state
    }
  };

  return (
    // Using container from App.scss or Bootstrap for consistent padding
    <Container fluid className="add-employee-page p-4">
      {/* The EmployeeForm component itself is styled as a card via .card-custom */}
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      <EmployeeForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isEditMode={false}
        loading={loading}
      />
    </Container>
  );
};

export default AddEmployee;