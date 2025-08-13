import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Layout.scss'; // Assuming common layout styles are in Layout.scss or App.scss

const Sidebar = () => {
  // Mock sidebar items based on the provided image
  const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'bi bi-graph-up' }, // Example icon
    { name: 'Pasien', path: '/pasien', icon: 'bi bi-person-lines-fill' },
    { name: 'Kunjungan', path: '/kunjungan', icon: 'bi bi-calendar-event' },
    { name: 'Pelayanan', path: '/pelayanan', icon: 'bi bi-heart-pulse' },
    { name: 'Karyawan', path: '/', icon: 'bi bi-people-fill' }, // Active link for employee management
    { name: 'Kasir', path: '/kasir', icon: 'bi bi-cash-stack' },
    { name: 'Farmasi', path: '/farmasi', icon: 'bi bi-capsule-pill' },
    { name: 'Inventori', path: '/inventori', icon: 'bi bi-box-seam' },
    { name: 'Purchasing', path: '/purchasing', icon: 'bi bi-cart3' },
    // Add other items as needed
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        Klinik Training {/* Or your app name/logo */}
      </div>
      <nav className="sidebar-nav">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive && item.path === '/' ? 'active' : '')} // Special handling for home
                // For other paths, NavLink handles 'active' class automatically if paths match exactly
                // Or use a more robust active check if needed
              >
                {item.icon && <i className={`${item.icon} me-2`}></i>}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;