import React from 'react';
import { Card, Button, Badge, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EmployeeList.scss'; // We will create/update this

const EmployeeList = ({ employees, onDelete, onEdit, apiBaseUrl }) => {
  if (!employees || employees.length === 0) {
    return <p className="text-center mt-4">Tidak ada data karyawan untuk ditampilkan.</p>;
  }

  // Ensure apiBaseUrl ends with a slash if it's provided and not empty
  const normalizedApiBaseUrl = apiBaseUrl && apiBaseUrl.endsWith('/') ? apiBaseUrl : `${apiBaseUrl || ''}/`;


  return (
    <div className="employee-list-container">
      <div className="employee-list-header d-none d-md-flex row gx-0 text-muted mb-2">
        <Col md={1} className="text-center">#</Col>
        <Col md={5}>Karyawan / Tenaga Kesehatan</Col>
        <Col md={2} className="text-center">Status</Col>
        <Col md={4} className="text-center">Aksi</Col>
      </div>
      {employees.map((employee, index) => (
        <Card key={employee.id} className="employee-card mb-3">
          <Card.Body>
            <Row className="align-items-center gy-2">
              <Col xs={12} md={1} className="text-center employee-index">
                {/* For pagination, you might want to calculate index based on page: (currentPage - 1) * limit + index + 1 */}
                {index + 1}
              </Col>
              <Col xs={12} md={5} className="employee-details">
                <div className="d-flex align-items-center">
                  {employee.photoPath ? (
                    <Image
                      src={`${normalizedApiBaseUrl}uploads/${employee.photoPath}`}
                      roundedCircle
                      className="employee-photo me-3"
                      alt={employee.fullName}
                      onError={(e) => { e.target.style.display = 'none'; /* Hide if broken */ }}
                    />
                  ) : (
                    <div className="employee-photo-placeholder me-3">
                      <i className="bi bi-person-fill"></i>
                    </div>
                  )}
                  <div>
                    <h5 className="mb-0 employee-name">{employee.fullName}</h5>
                    <small className="text-muted employee-type">{employee.employeeType}</small>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={2} className="text-center employee-status-col">
                <Badge bg={employee.status === 'AKTIF' ? 'success' : 'secondary'} className="employee-status-badge">
                  {employee.status}
                </Badge>
              </Col>
              <Col xs={6} md={4} className="text-center employee-actions">
                <Button variant="link" className="action-icon-btn p-0 me-2" onClick={() => onEdit(employee.id)} title="Edit">
                  {/* Using a simple arrow for now, can be replaced with an edit icon */}
                  <i className="bi bi-pencil-square text-warning fs-5"></i>
                </Button>
                <Button variant="link" className="action-icon-btn p-0" onClick={() => onDelete(employee.id)} title="Hapus">
                  <i className="bi bi-trash text-danger fs-5"></i>
                </Button>
                 {/* The blue arrow button from the image seems to be for navigation or details view */}
                 {/* For now, we use edit/delete. If it's for details: */}
                <Button variant="primary" className="action-details-btn ms-2" onClick={() => onEdit(employee.id)} title="Lihat Detail/Edit">
                  <i className="bi bi-arrow-right-circle-fill"></i>
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default EmployeeList;