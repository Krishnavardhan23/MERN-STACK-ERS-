import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/CheckReviews.css';

const CheckReviews = () => {
  const { organization_name, employeeId } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/getemployees/${organization_name}`);
        setEmployees(response.data.employees || []);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/employee/${employeeId}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    };

    fetchEmployees();
    fetchCurrentUser();
  }, [organization_name, employeeId]);

  const renderEmployees = () => {
    return employees.map((employee, index) => {
      if (currentUser && currentUser.Employeestatus !== employee.Employeestatus) {
        return (
          <tr key={employee._id}>
            <td>{index + 1}</td>
            <td>{employee.empname}</td>
            <td>{employee.Employeestatus}</td>
            <td>{employee.mail}</td>
            <td>{employee.rating}</td>
            <td>{employee.projectspending}</td>
            {(currentUser.Employeestatus === "Admin" && employee.Employeestatus !== "Admin") || 
             (currentUser.Employeestatus === "Manager" && employee.Employeestatus === "Employee") ? (
              <>
                <td>
                  <NavLink to={`/reviewsofemp/${organization_name}/${employeeId}/${employee._id}`}>
                    <button className="review-button">Reviews</button>
                  </NavLink>
                </td>
                <td>
                  <NavLink to={`/rate/${organization_name}/${employeeId}/${employee._id}`}>
                    <button className="rate-button">Rate Employee</button>
                  </NavLink>
                </td>
              </>
            ) : null}
          </tr>
        );
      }
      return null;
    });
  };

  return (
    <div className='checkReviews-container'>
      <button className="back-button" onClick={() => navigate(`/adminhome/${organization_name}/${employeeId}`)}>Back to Dashboard</button>
      <div className="checkreviewstable">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee Name</th>
              <th>Employee Status</th>
              <th>Mail</th>
              <th>Rating</th>
              <th>Pending Projects</th>
              <th>Review</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {renderEmployees()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckReviews;
