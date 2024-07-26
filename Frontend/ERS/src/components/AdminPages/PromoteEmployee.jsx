import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/CheckReviews.css';
const PromoteEmployee = () => {
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
  
    const handlePromote = async (employee) => {
        try {
            console.log(`Promoting Employee ID: ${employee._id}`);
          await axios.post(`http://localhost:3000/admin/promoteemployee/${organization_name}/${employee._id}`);
          toast.success(`Employee ${employee.empname} promoted successfully!`);
          const response = await axios.get(`http://localhost:3000/admin/getemployees/${organization_name}`);
          setEmployees(response.data.employees || []);
        } catch (error) {
          console.error('Failed to promote employee:', error);
          toast.error('Failed to promote employee');
        }
      };
      
  
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
              {(currentUser.Employeestatus === "Admin" && employee.Employeestatus !== "Admin" && employee.Employeestatus !== "Manager") ||
               (currentUser.Employeestatus === "Manager" && employee.Employeestatus === "Employee") ? (
                <>
                  <td>
                    <button onClick={() => handlePromote(employee)}>Promote</button>
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
      <div>
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
                  <th>Promote</th>
                </tr>
              </thead>
              <tbody>
                {renderEmployees()}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  };
  
  export default PromoteEmployee;
  