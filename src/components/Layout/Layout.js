import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
// import './Layout.scss'; // Or App.scss if styles are global

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-wrapper">
        <Header />
        <main className="main-content">
          {children}
        </main>
        {/* You can add a Footer component here if needed */}
      </div>
    </div>
  );
};

export default Layout;