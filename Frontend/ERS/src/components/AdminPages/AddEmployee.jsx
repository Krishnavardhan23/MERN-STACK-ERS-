import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/AddEmployee.css';

const AddEmployee = () => {
  const { organization_name, employeeId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    empname: '',
    mail: '',
    password: '',
    age: '',
    Employeestatus: 'Employee',
    rating: 2,
    projectspending: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    try {
      const response = await axios.post(`http://localhost:3000/admin/addemployee/${organization_name}/${employeeId}`, formData);
      console.log("Response from server:", response);
      toast.success('Employee added successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setFormData({
        empname: '',
        mail: '',
        password: '',
        age: '',
        Employeestatus: 'Employee',
        rating: 2,
        projectspending: 0,
      });
      navigate(`/adminhome/${organization_name}/${employeeId}`);
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Failed to add employee', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="addemployee-container">
      <button className="back-button" onClick={() => navigate(`/adminhome/${organization_name}/${employeeId}`)}>Back to Dashboard</button>
      <div className="form-container">
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="empname"
              value={formData.empname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Employee</button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default AddEmployee;
