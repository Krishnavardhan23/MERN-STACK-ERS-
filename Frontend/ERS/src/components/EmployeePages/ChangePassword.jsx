import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/ChangePassword.css';
import ForgotPassword from './ForgotPassword';

const ChangePassword = () => {
  const { organization_name, employeeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('changePassword');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New Password and Confirm Password do not match');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/employee/changepassword/${employeeId}`, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setMessage('Password changed successfully');
      setError('');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => {
        navigate(`/EmployeeHome/${organization_name}/${employeeId}`);
      }, 1500);
    } catch (error) {
      console.error('Failed to change password:', error);
      setError('Failed to change password. Check current password.');
      setMessage('');
    }
  };

  const renderContent = () => {
    if (activeTab === 'changePassword') {
      return (
        <div className="changepasswordmain">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Current Password</label>
              <input
                type="String"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="String"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Confirm New Password</label>
              <input
                type="String"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Change Password</button>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
          </form>
        </div>
      );
    } 
    else if (activeTab === 'forgotPassword') 
    {
      return <ForgotPassword />;
    }
  };

  return (
    <div className='changePassword'>
      <div>
        <button className="back-button" onClick={() => navigate(`/EmployeeHome/${organization_name}/${employeeId}`)}>
          Back to Home Page
        </button>
      </div>
      <div className="chphead">
        <h3 className={activeTab === 'changePassword' ? 'active' : ''} onClick={() => handleTabClick('changePassword')}>
          Change Password
        </h3>
        <h3 className={activeTab === 'forgotPassword' ? 'active' : ''} onClick={() => handleTabClick('forgotPassword')}>
          Forgot Password
        </h3>
      </div>
      {renderContent()}
    </div>
  );
};

export default ChangePassword;
