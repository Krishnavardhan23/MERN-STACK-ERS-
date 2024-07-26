import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Empheader.css'; // Ensure you have appropriate styles
import axios from 'axios';

const Empheader = ({ organizationName, employeeId }) => {
  const [employeename,setemployeename]=useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${employeeId}`);
        setemployeename(response.data.employee.empname);
        if (response.data.employee.Employeestatus === 'Admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    if (employeeId) {
      checkAdminStatus();
    }
  }, [employeeId]);

  return (
    <div className="header-container">
      <nav className="navbar">
        <div className="navbar-left">
          {/* You can add a logo or company icon here */}
        </div>
        <div className="navbar-middle">
          {organizationName}---EMPLOYEE:{employeename}
        </div>
        <div className="navbar-right">
          <Link to={`/Works/${organizationName}/${employeeId}`} className="nav-link">Works</Link>
          <Link to={`/Reviews/${organizationName}/${employeeId}`} className="nav-link">Reviews</Link>
          <Link to={`/changepassword/${organizationName}/${employeeId}`} className="nav-link">Change Password</Link>
          <Link to={`/Announcements/${organizationName}/${employeeId}`} className="nav-link">Announcements</Link>
          {isAdmin && <Link to={`/AdminLogin/${organizationName}/${employeeId}`} className="nav-link">Admin Login</Link>}
          <Link to={`/`} className="nav-link">LogOut</Link>
        </div>
      </nav>
    </div>
  );
};

export default Empheader;
