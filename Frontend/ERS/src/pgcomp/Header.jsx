import React from 'react';
import '../assets/styles/header.css';
import {NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className='Left'>
          <img src='/CompanyLogo.png' alt='Logo' />
        </div>
        <div className='Middle'>
          <h2>Employee Review System</h2>
        </div>
        <div className='Right'>
          <NavLink to="/LoginasEmp">
            <button className='login-btn'>Login as Employee</button>
          </NavLink>
          <NavLink to="/create-organization">
            <button className='create-btn'>Create Organization</button>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Header;
