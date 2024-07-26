import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Empheader from '../../pgcomp/Empheader';
import axios from 'axios';
import '../../assets/styles/AdminLogin.css';

const AdminLogin = () => {
  const { organization_name, employeeId } = useParams();
  const [admin, setAdmin] = useState({
    mail: '',
    admincode: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/adminlogin/${organization_name}/${employeeId}`, admin);
      setMessage(response.data.message);
      setError('');
      navigate(`/AdminHome/${organization_name}/${employeeId}`);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to login');
      setMessage('');
    }
  };

  return (
    <div className='AdminLogin'>
      <Empheader organizationName={organization_name} employeeId={employeeId} />
      <div className="formbox">
        <form onSubmit={handleSubmit}>
          <label>Mail ID:</label>
          <div>
            <input
              type="text"
              name="mail"
              value={admin.mail}
              onChange={handleInputChange}
              required
              placeholder='Enter Your Mail ID'
            />
          </div>
          <label>Admin CODE:</label>
          <div>
            <input
              type="Number"
              name="admincode"
              value={admin.admincode}
              onChange={handleInputChange}
              required
              placeholder='Enter Admin Code'
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>     
    </div>
  );
};

export default AdminLogin;
