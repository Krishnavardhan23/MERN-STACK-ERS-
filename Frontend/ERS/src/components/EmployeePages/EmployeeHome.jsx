import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Empheader from '../../pgcomp/Empheader';
import '../../assets/styles/EmployeeHome.css'; // Import the CSS file

const EmployeeHome = () => {
  const { organization_name, employeeId } = useParams();
  const [employee, setEmployee] = useState({
    empname: '',
    mail: '',
    age: '',
    Employeestatus: '',
    rating: '',
    projectspending: '',
    admincode: ''
  });

  useEffect(() => {
    const fetchemployeedetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employee/getemployeedata/${employeeId}`);
        setEmployee(response.data.employee);
      } catch (error) {
        console.error('Failed to fetch employee details:', error);
      }
    };

    fetchemployeedetails();
  }, [employeeId]);

  return (
    <div>
      <Empheader organizationName={organization_name} employeeId={employeeId} />
      <div className="employee-home-container">
        <div className="profile-section">
          <div className="profile-picture">
            <img src="path/to/profile-picture.jpg" alt="Profile" />
            <button className="change-photo-button">Change Photo</button>
          </div>
        </div>
        <div className="details-section">
          <div className="header">
            <h2>{employee.empname}</h2>
          </div>
          <div className="headernext">
            <p>{employee.Employeestatus}</p>
            <p>RATING: {employee.rating}</p>
          </div>
          <div className="tabs">
            <span className="tab active">About</span>
            <span className="tab">Timeline</span>
          </div>
          <div className="info-table">
            <table>
              <tbody>
                <tr>
                  <td>User Id</td>
                  <td>{employeeId}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{employee.empname}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{employee.mail}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{employee.Employeestatus}</td>
                </tr>
                <tr>
                  <td>Projects Pending</td>
                  <td>{employee.projectspending}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
