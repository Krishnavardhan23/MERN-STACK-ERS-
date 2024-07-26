import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/ForgotPassword.css';
import { useNavigate, useParams } from 'react-router-dom';

const ForgotPassword = () => {
    const {organization_name,employeeId}=useParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/employee/forgotpassword/${employeeId}`, { email: formData.email, password: formData.password });
      setMessage('Password reset link sent to your email');
      setError('');
      setFormData({
        email: '',
        password: ''
      });
      navigate(`/EmployeeHome/${organization_name}/${employeeId}`);
    } catch (error) {
      console.error('Failed to send reset link:', error);
      setError('Failed to send reset link.');
      setMessage('');
    }
  };

  return (
    <div className='forgotPassword'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="String"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="String"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
