import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/AdminHome.css';

const AdminHome = () => {
  const { organization_name, employeeId } = useParams();
  const [admin, setAdmin] = useState({ empname: '' });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('organization_name:', organization_name);
    console.log('employeeId:', employeeId);

    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/fetchadmindata/${organization_name}/${employeeId}`);
        const { admin, employees } = response.data;
        setAdmin(admin);
        setEmployees(employees);
      } catch (error) {
        console.error('Failed to fetch admin details:', error);
        setError('Failed to fetch admin details');
      }
    };

    fetchAdminDetails();
  }, [organization_name, employeeId]);

  const renderEmployees = () => {
    return employees.map((employee, index) => (
      <tr key={employee._id}>
        <td>{index + 1}</td>
        <td>{employee.empname}</td>
        <td>{employee.Employeestatus}</td>
        <td>{employee.mail}</td>
        <td>{employee.rating}</td>
        <td>{employee.projectspending}</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="header">
        <div className="middleadmin">HI {admin.empname}</div>
      </div>
      <div className="adminmain">
        <div className="sidebar">
          <div className="addemployee">
            <NavLink to={`/addemployee/${organization_name}/${employeeId}`}>Add Employee</NavLink>
          </div>
          <div className="deleteemployee">
            <NavLink to={`/deleteemployee/${organization_name}/${employeeId}`}>Delete Employee</NavLink>
          </div>
          <div className="addwork">
            <NavLink to={`/addwork/${organization_name}/${employeeId}`}>Add Work</NavLink>
          </div>
          <div className="reviewwork">
            <NavLink to={`/CheckReviews/${organization_name}/${employeeId}`}>Review Work</NavLink>
          </div>
          <div className="promoteemployee">
            <NavLink to={`/PromoteEmployee/${organization_name}/${employeeId}`}>Promote Employee</NavLink>
          </div>
          <div className="employeelogin">
            <NavLink to="/LoginasEmp">Employee Login</NavLink>
          </div>
        </div>
        <div className="adminhome">
          <div className="adminhometable">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Employee Name</th>
                  <th>Employee Status</th>
                  <th>Mail</th>
                  <th>Rating</th>
                  <th>Pending Projects</th>
                </tr>
              </thead>
              <tbody>
                {renderEmployees()}
              </tbody>
            </table>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default AdminHome;
