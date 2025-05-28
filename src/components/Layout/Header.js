import React from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
// import './Layout.scss'; // Assuming common layout styles are in Layout.scss or App.scss
// You might need to import Bootstrap icons if you plan to use them directly
// import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  // Placeholder user data
  const user = {
    name: 'kliniktraining',
    role: '(Manager, Dokter, Kasir)',
    avatar: 'https://via.placeholder.com/40' // Replace with actual avatar or default
  };

  return (
    <header className="main-header">
      <Navbar expand="lg" className="w-100 p-0">
        {/* Left side of the header - e.g., a toggle for sidebar or breadcrumbs */}
        <Nav className="me-auto">
          {/* Example: Sidebar toggle button for smaller screens */}
          {/* <Button variant="outline-secondary" onClick={() => console.log('Toggle Sidebar')}>
            <i className="bi bi-list"></i>
          </Button> */}
          <Navbar.Brand href="#home" className="ms-2">Medeva ✨</Navbar.Brand> {/* App Name/Logo */}
        </Nav>

        {/* Right side of the header */}
        <Nav>
          <Nav.Link href="#notifications">
            <i className="bi bi-bell fs-5"></i> {/* Notification Icon */}
          </Nav.Link>
          <NavDropdown
            title={
              <>
                <Image src={user.avatar} roundedCircle className="me-2" style={{ width: '30px', height: '30px' }} />
                <span>{user.name} <small className="d-block text-muted" style={{fontSize: '0.75rem'}}>{user.role}</small></span>
              </>
            }
            id="user-dropdown"
            align="end"
          >
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;