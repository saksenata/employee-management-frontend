import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
  Dropdown,
  Spinner,
  Alert,
  Pagination
} from 'react-bootstrap';
import EmployeeList from '../../components/EmployeeList'; // We will refine this component
import { getEmployees, deleteEmployee } from '../../services/employeeService';
import './Home.scss'; // Styles will be updated/used

const Home = () => {
  const [employeesData, setEmployeesData] = useState({
    employees: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // '', 'AKTIF', 'NON-AKTIF'
  const [limit, setLimit] = useState(10); // Items per page

  const navigate = useNavigate();

  const fetchEmployees = useCallback(async (page = 1, search = searchTerm, status = statusFilter) => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit, search, status };
      if (!status) delete params.status; // Don't send empty status
      if (!search) delete params.search; // Don't send empty search

      const response = await getEmployees(params);
      if (response.success) {
        setEmployeesData({
          employees: response.data.employees,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
        });
      } else {
        throw new Error(response.message || 'Failed to fetch employees');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mengambil data karyawan.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, limit]);

  useEffect(() => {
    fetchEmployees(1); // Fetch on initial load and when filters change
  }, [fetchEmployees]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    fetchEmployees(1, searchTerm, statusFilter);
  };

  const handleStatusFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    fetchEmployees(1, searchTerm, newStatus);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
      try {
        await deleteEmployee(id);
        // Refetch current page after delete
        fetchEmployees(employeesData.currentPage, searchTerm, statusFilter);
      } catch (err) {
        setError(err.message || 'Gagal menghapus karyawan.');
        console.error(err);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchEmployees(pageNumber, searchTerm, statusFilter);
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  return (
    <Container fluid className="home-page-container p-4">
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <h4 className="page-title">DATA KARYAWAN & TENAGA KESEHATAN</h4>
          {/* "Semua Karyawan" could be a breadcrumb or static text */}
          <small className="text-muted">Semua Karyawan</small>
        </Col>
        <Col md={6} className="text-md-end mt-2 mt-md-0">
          <Dropdown as={ButtonGroup}>
            <Button variant="primary" as={Link} to="/add-employee">
              <i className="bi bi-plus-lg me-2"></i>Tambah Karyawan
            </Button>
            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Salin Data Karyawan</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="mb-4 filter-controls align-items-center gy-2">
        <Col md={4}>
          <ButtonGroup className="w-100">
            <Button
              variant={statusFilter === '' ? 'secondary' : 'outline-secondary'}
              onClick={() => handleStatusFilterChange('')}
            >
              SEMUA
            </Button>
            <Button
              variant={statusFilter === 'AKTIF' ? 'success' : 'outline-success'}
              onClick={() => handleStatusFilterChange('AKTIF')}
            >
              AKTIF
            </Button>
            <Button
              variant={statusFilter === 'NON-AKTIF' ? 'danger' : 'outline-danger'}
              onClick={() => handleStatusFilterChange('NON-AKTIF')}
            >
              NON-AKTIF
            </Button>
          </ButtonGroup>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <InputGroup>
            <FormControl
              placeholder="Pencarian..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
            <Button variant="outline-secondary" onClick={handleSearchSubmit}>
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <EmployeeList
            employees={employeesData.employees}
            onDelete={handleDelete}
            onEdit={handleEdit}
            apiBaseUrl={process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}
          />
          {employeesData.totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={employeesData.currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(employeesData.currentPage - 1)}
                disabled={employeesData.currentPage === 1}
              />
              {[...Array(employeesData.totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === employeesData.currentPage}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(employeesData.currentPage + 1)}
                disabled={employeesData.currentPage === employeesData.totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(employeesData.totalPages)}
                disabled={employeesData.currentPage === employeesData.totalPages}
              />
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;