import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/DeleteEmployee.css';

const DeleteEmployee = () => {
  const { organization_name, employeeId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [adminStatus, setAdminStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch the details of the current employee (admin or manager)
        const adminResponse = await axios.get(`http://localhost:3000/admin/employee/${employeeId}`);
        const adminData = adminResponse.data;
        console.log(adminData);
        setAdminStatus(adminData.Employeestatus);

        // Fetch all employees in the organization
        const response = await axios.get(`http://localhost:3000/api/fetchadmindata/${organization_name}/${employeeId}`);
        const fetchedEmployees = response.data.employees;
        console.log(fetchedEmployees);

        // Filter employees based on the admin status
        if (adminData.Employeestatus === 'Admin') {
          setEmployees(fetchedEmployees.filter(emp => emp.Employeestatus !== 'Admin'));
        } else if (adminData.Employeestatus === 'Manager') {
          setEmployees(fetchedEmployees.filter(emp => emp.Employeestatus === 'Employee'));
        } else {
          toast.error('Unauthorized access');
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch employees or admin details:', error);
        toast.error('Failed to fetch employees or admin details');
      }
    };

    fetchDetails();
  }, [organization_name, employeeId, navigate]);

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/deleteemployee/${organization_name}/${empId}`);
      setEmployees(employees.filter(employee => employee._id !== empId));
      toast.success('Employee deleted successfully');
    } catch (error) {
      console.error('Failed to delete employee:', error);
      toast.error('Failed to delete employee');
    }
  };

  const handleBackToDashboard = () => {
    navigate(`/AdminHome/${organization_name}/${employeeId}`);
  };

  return (
    <div className="delete-employee-container">
      <ToastContainer />
      <button className="back-button" onClick={handleBackToDashboard}>Back to Dashboard</button>
      <h1>Delete Employee</h1>
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee Name</th>
              <th>Employee Status</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Pending Projects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>{employee.empname}</td>
                <td>{employee.Employeestatus}</td>
                <td>{employee.mail}</td>
                <td>{employee.rating}</td>
                <td>{employee.projectspending}</td>
                <td>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
};

export default DeleteEmployee;
