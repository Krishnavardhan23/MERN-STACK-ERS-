import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/AdminForm.css'; 
import axios from 'axios';

const AdminForm = () => {
  const [employee, setEmployee] = useState({
    password: '',
    age: '',
    Employeestatus: 'Admin',
  });
  const [organization, setOrganization] = useState({
    organization_name: '',
    adminname: '',
    mail: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const organizationName = new URLSearchParams(location.search).get('organization_name');

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/fetchorgdata?organization_name=${organizationName}`);
        setOrganization(response.data);
      } catch (error) {
        console.error('Failed to fetch organization details:', error);
        setError('Failed to fetch organization details');
      }
    };

    if (organizationName) {
      fetchOrganizationDetails();
    }
  }, [organizationName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/admindetails', {
        ...employee,
        organizationName
      });
      setMessage(response.data.message);
      setError('');
      navigate(`/`);  // Redirect to home page after successful registration
    } catch (error) {
      console.error('Error in form submission:', error);
      setError(error.response.data.error || 'Server error');
      setMessage('');
    }
  };

  return (
    <div className="admin-form-container">
      <div className="admin-form-content">
        <h1>Admin Form</h1>
        <h2>Hello {organization.adminname}</h2>
        <h2>Organization-name: {organization.organization_name}...</h2>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h2>Email: {organization.mail}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={employee.age}
                  onChange={handleChange}
                  required
                />
              </div>    
              <button type="submit">Save Employee</button>
            </form>
            {message && <p className="message">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminForm;
