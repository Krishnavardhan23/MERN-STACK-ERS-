import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Loginemp.css';
import { useNavigate } from 'react-router-dom';

const LoginAsEmployee = () => {
  const [employee, setEmployee] = useState({
    organization_name: "",
    mail: "",
    password: ""
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', employee);
      setMessage(response.data.message);
      setError('');
      const organizationName = response.data.organization_name;
      const employeeId = response.data.employee._id;
      navigate(`/EmployeeHome/${organizationName}/${employeeId}`);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to login');
      setMessage('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div>
            <i className="zmdi zmdi-library"></i>
            <input
              type="text"
              name="organization_name"
              value={employee.organization_name}
              onChange={handleInputChange}
              required
              placeholder="Organization Name"
            />
          </div>
          <div>
            <i className="zmdi zmdi-email"></i>
            <input
              type="email"
              name="mail"
              value={employee.mail}
              onChange={handleInputChange}
              required
              placeholder="Email"
            />
          </div>
          <div>
            <i className="zmdi zmdi-lock"></i>
            <input
              type="password"
              name="password"
              value={employee.password}
              onChange={handleInputChange}
              required
              placeholder="Enter Your Password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>
      <div className="login-image">
        <img src="/login.png" alt="A boy is logging in" />
      </div>
    </div>
  );
};

export default LoginAsEmployee;
